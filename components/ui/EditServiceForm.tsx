'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function EditServiceForm({ service }: { service: any }) {
  const [title, setTitle] = useState(service.title);
  const [description, setDescription] = useState(service.description);
  const [completionDays, setCompletionDays] = useState(service.estimatedDays || 1);
  const [price, setPrice] = useState(service.price || 0);
  const [additionalOfferings, setAdditionalOfferings] = useState(service.additionalOfferings || []);

  const handleSubmit = () => {
    console.log('Submit updated service:', { title, description, completionDays, price, additionalOfferings });
    // Call your update API here
  };

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-md w-full max-w-lg">
      <h2 className="text-xl font-semibold">Edit Service</h2>

      {/* Title */}
      <div className="space-y-1">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Service title"
        />
      </div>

      {/* Description */}
      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Service description"
          className="resize-none"
          rows={4}
        />
      </div>

      {/* Estimated Completion */}
      <div className="space-y-1">
        <Label htmlFor="completion">Estimated Completion Time (Days)</Label>
        <Input
          id="completion"
          type="number"
          value={completionDays}
          onChange={(e) => setCompletionDays(Number(e.target.value))}
          min={1}
        />
      </div>

      {/* Price */}
      <div className="space-y-1">
        <Label htmlFor="price">Price (MYR)</Label>
        <Input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={0}
        />
      </div>

      {/* Additional Offerings */}
      <div className="space-y-1">
        <Label>Additional Offerings</Label>
        <div className="flex flex-wrap gap-2">
          {additionalOfferings.map((item: string, index: number) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => {
                const newOfferings = additionalOfferings.filter((_, i) => i !== index);
                setAdditionalOfferings(newOfferings);
              }}
            >
              {item} ×
            </Button>
          ))}
          <Select onValueChange={(value) => setAdditionalOfferings([...additionalOfferings, value])}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Add Offering" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Company Security Subscription">Company Security Subscription</SelectItem>
              <SelectItem value="CTC Copies">CTC Copies</SelectItem>
              <SelectItem value="Kilograms">Kilograms</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="ghost" onClick={() => console.log('Cancel')}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </div>
    </div>
  );
}
