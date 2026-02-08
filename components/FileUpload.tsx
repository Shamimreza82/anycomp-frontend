'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { CloudUpload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface FileUploadProps {
  label?: string;
  maxSizeMB?: number;
  onUpload: (file: File) => Promise<any>; // callback to handle upload
}

export function FileUpload({ label = 'Upload File', maxSizeMB = 4, onUpload }: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles: File[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      if (file.size / 1024 / 1024 > maxSizeMB) {
        toast.error(`File "${file.name}" exceeds ${maxSizeMB}MB`);
        continue;
      }

      // Avoid duplicates
      if (!files.find((f) => f.name === file.name && f.size === file.size)) {
        newFiles.push(file);
      }
    }

    if (newFiles.length === 0) return;

    // Append new files
    setFiles((prev) => [...prev, ...newFiles]);

    setLoading(true);
    try {
      // Upload all new files
      await Promise.all(newFiles.map((file) => onUpload(file)));
      toast.success('Files uploaded successfully!');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to upload files');
    } finally {
      setLoading(false);
      // Reset input value to allow re-upload of same file if removed
      e.target.value = '';
    }
  };

  const handleRemove = (fileToRemove: File) => {
    setFiles((prev) => prev.filter((f) => f !== fileToRemove));
  };

  return (
    <div className="grid w-full items-start gap-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="flex items-center gap-2 flex-wrap">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <Button variant="outline" size="sm" className="flex items-center gap-2">
            <CloudUpload size={16} />
            Upload
          </Button>
        </label>
        {loading && <span className="text-sm text-gray-500">Uploading...</span>}
      </div>

      {files.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 border p-2 rounded"
            >
              <p className="text-sm text-gray-700">{file.name}</p>
              <Button
                variant="destructive"
                onClick={() => handleRemove(file)}
              >
                <Trash2 size={14} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
