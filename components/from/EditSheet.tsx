'use client';

import * as React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import axios from 'axios';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { X, Trash2, Edit } from 'lucide-react';
import api from '@/lib/axiosInstance';

// Zod schema
const editSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug must be lowercase, hyphen-separated'),
  description: z.string().min(5, 'Description is required'),
  basePrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid base price'),
  platformFee: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid platform fee'),
  finalPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Invalid final price'),
  durationDays: z.number().min(1, 'Duration must be at least 1 day'),
});

type EditFormData = z.infer<typeof editSchema>;

interface EditSheetProps {
  apiData: EditFormData;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditSheet({ open, onOpenChange, apiData }: EditSheetProps) {
  const [images, setImages] = useState<File[]>([]); // Selected images
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // Preview images

  const { register, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: apiData,
  });

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    setImages(selectedFiles);
    setPreviewUrls(selectedFiles.map(file => URL.createObjectURL(file)));
  };

  // Remove selected image
  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviewUrls(newPreviews);
  };

  // Submit form
  const onSubmit = async (data: EditFormData) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });
      images.forEach(file => formData.append('files', file));

      formData.append("data", JSON.stringify(data));

      const response = await api.patch(`/specialist/${apiData?.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      toast.success('Updated successfully!');
      onOpenChange(false);

    } catch (error: any) {
      console.error(error);
      toast.error('Failed to update');
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Edit className="h-4 w-4" /> 
          Edit
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[500px]">
        <SheetHeader>
          <SheetTitle>Edit Service</SheetTitle>
          <SheetDescription>Make changes to your service below.</SheetDescription>
        </SheetHeader>

        <form className="space-y-4 mt-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label>Title</Label>
            <Input {...register('title')} />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          <div>
            <Label>Slug</Label>
            <Input {...register('slug')} />
            {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
          </div>

          <div>
            <Label>Description</Label>
            <Textarea {...register('description')} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div>
            <Label>Base Price</Label>
            <Input type="text" {...register('basePrice')} />
            {errors.basePrice && <p className="text-red-500 text-sm">{errors.basePrice.message}</p>}
          </div>

          <div>
            <Label>Platform Fee</Label>
            <Input type="text" {...register('platformFee')} />
            {errors.platformFee && <p className="text-red-500 text-sm">{errors.platformFee.message}</p>}
          </div>

          <div>
            <Label>Final Price</Label>
            <Input type="text" {...register('finalPrice')} />
            {errors.finalPrice && <p className="text-red-500 text-sm">{errors.finalPrice.message}</p>}
          </div>

          <div>
            <Label>Duration (days)</Label>
            <Input type="number" {...register('durationDays', { valueAsNumber: true })} />
            {errors.durationDays && <p className="text-red-500 text-sm">{errors.durationDays.message}</p>}
          </div>

          <div>
            <Label>Images (optional)</Label>
            <Input type="file" multiple accept="image/*" onChange={handleImageChange} />
            <div className="flex gap-2 mt-2 flex-wrap">
              {previewUrls.map((url, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img src={url} alt="preview" className="w-full h-full object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="mt-4 w-full">
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}
