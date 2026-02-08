'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
import { Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import api from '@/lib/axiosInstance';

/* =========================
   Zod Schema
========================= */
const serviceSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  slug: z.string().min(3, 'Slug is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  basePrice: z
    .string()
    .min(1, 'Base price required')
    .refine((val) => !isNaN(Number(val)), { message: 'Base price must be a number' }),
  platformFee: z
    .string()
    .min(1, 'Platform fee required')
    .refine((val) => !isNaN(Number(val)), { message: 'Platform fee must be a number' }),
  durationDays: z
    .number({ required_error: 'Duration is required' })
    .min(1, 'Minimum 1 day required')
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

export function CreateServiceDialog() {
  const [open, setOpen] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      durationDays: 0
    }
  });

  /* =========================
     Auto Slug Generator
  ========================= */
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  /* =========================
     Watch Prices
  ========================= */
  const basePrice = watch('basePrice');
  const platformFee = watch('platformFee');

  const finalPrice =
    (parseFloat(basePrice || '0') + parseFloat(platformFee || '0')).toFixed(2);

  /* =========================
     Remove Image
  ========================= */
  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  /* =========================
     Submit
  ========================= */
  const onSubmit = async (data: ServiceFormValues) => {
    if (images.length === 0) {
      toast.error('Please upload at least one image');
      return;
    }

    setLoading(true); // ✅ Start loading
    try {
      const formData = new FormData();

      const formattedData = {
        ...data,
        finalPrice,
        durationDays: Number(data.durationDays)
      };

      images.forEach((file) => formData.append('files', file));
      formData.append('data', JSON.stringify(formattedData));

      const res = await api.post('/specialist', formData, { withCredentials: true });

      if (res.data.success) {
        toast.success('Service created successfully');
        setOpen(false);
        setImages([]);
        window.location.reload(); // Reload to show new service
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false); // ✅ Stop loading
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Create Service</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Service</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          {/* TITLE */}
          <div>
            <Label htmlFor="title">Service Title</Label>
            <Input
              id="title"
              {...register('title')}
              onChange={(e) => {
                setValue('title', e.target.value);
                setValue('slug', generateSlug(e.target.value));
              }}
            />
            {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
          </div>

          {/* SLUG */}
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input id="slug" {...register('slug')} />
            {errors.slug && <p className="text-red-500 text-sm">{errors.slug.message}</p>}
          </div>

          {/* DESCRIPTION */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...register('description')} />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          {/* PRICE */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <Input placeholder="Base Price" {...register('basePrice')} />
              {errors.basePrice && <p className="text-red-500 text-sm">{errors.basePrice.message}</p>}
            </div>
            <div>
              <Input placeholder="Platform Fee" {...register('platformFee')} />
              {errors.platformFee && <p className="text-red-500 text-sm">{errors.platformFee.message}</p>}
            </div>
            <Input value={finalPrice} readOnly placeholder="Final Price" />
          </div>

          {/* DURATION */}
          <div>
            <Input
              type="number"
              placeholder="Duration (days)"
              {...register('durationDays', { valueAsNumber: true })}
            />
            {errors.durationDays && <p className="text-red-500 text-sm">{errors.durationDays.message}</p>}
          </div>

          {/* SERVICE IMAGES */}
          <div>
            <Label>Service Images</Label>
            <Input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && setImages(Array.from(e.target.files))}
            />

            {/* IMAGE PREVIEW WITH REMOVE */}
            <div className="grid grid-cols-3 gap-2 mt-2">
              {images.map((file, i) => (
                <div key={i} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="h-24 w-full object-cover rounded"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="destructive"
                    className="absolute top-1 right-1 p-1 rounded-full"
                    onClick={() => removeImage(i)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
