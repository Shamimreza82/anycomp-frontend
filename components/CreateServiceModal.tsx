'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from './ui/dialog';
import { toast } from 'sonner';
import { useDashboardStore } from '@/store/dashboardStore';
import api from '@/lib/axiosInstance';
import { FileUpload } from './FileUpload';


export function CreateServiceDialog() {
  const { fetchServices } = useDashboardStore();
  const [open, setOpen] = useState(false);

  // Form state
  const [form, setForm] = useState({
    title: 'Professional Web App Development',
    slug: 'professional-web-app-development',
    description:
      'I will build a fast, secure, and scalable web application using modern technologies.',
    basePrice: '5000.00',
    platformFee: '500.00',
    finalPrice: '5500.00',
    durationDays: 15
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    let updatedForm = { ...form, [name]: value };

    // Auto-calculate finalPrice
    if (name === 'basePrice' || name === 'platformFee') {
      const base = parseFloat(updatedForm.basePrice) || 0;
      const fee = parseFloat(updatedForm.platformFee) || 0;
      updatedForm.finalPrice = (base + fee).toFixed(2);
    }

    setForm(updatedForm);
  };


  /// File upload handler
const uploadServiceImage = async (file: File) => {
  const formData = new FormData()
    formData.append('photo', file)
    formData.append('title', 'Service Image')
    formData.append('specialistId', '12345')

    const res = await api.post('/media/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })

  return res.data
}

   
  
  const handleSubmit = async () => {
    try {
      const res = await api.post('/specialist', form, { withCredentials: true });

      if (res.data.success) {
        toast.success('Service created successfully!');
        fetchServices(); // Refresh table
        setOpen(false);
      } else {
        toast.error(res.data.message || 'Failed to create service.');
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="gap-2">
          Create
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Service</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 mt-2">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" value={form.title} onChange={handleChange} />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" name="slug" value={form.slug} onChange={handleChange} />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="basePrice">Base Price</Label>
              <Input
                id="basePrice"
                name="basePrice"
                value={form.basePrice}
                onChange={handleChange}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="platformFee">Platform Fee</Label>
              <Input
                id="platformFee"
                name="platformFee"
                value={form.platformFee}
                onChange={handleChange}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="finalPrice">Final Price</Label>
              <Input
                id="finalPrice"
                name="finalPrice"
                value={form.finalPrice}
                onChange={handleChange}
                readOnly
              />
            </div>
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="durationDays">Duration (days)</Label>
            <Input
              id="durationDays"
              name="durationDays"
              type="number"
              value={form.durationDays}
              onChange={handleChange}
            />
          </div>
        </div>
        <FileUpload
          label="Service Image"
          maxSizeMB={4}
          onUpload={uploadServiceImage}
          onUploadSuccess={(data) => {
            console.log("file data", data)
            toast.success('Image uploaded!')
          }}
        />

        <DialogFooter className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create</Button>
        </DialogFooter>
      </DialogContent>
      {/* SlideOver */}

    </Dialog>
  );
}
