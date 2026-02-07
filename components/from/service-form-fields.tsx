"use client"

import React, { useCallback, useRef, useState } from "react"
import type { UseFormReturn } from "react-hook-form"
import { ImagePlus, X } from "lucide-react"

import {
  ADDITIONAL_OFFERINGS,
  COMPLETION_DAYS,
  type ServiceFormValues,
} from "@/lib/service-schema"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ServiceFormFieldsProps {
  form: UseFormReturn<ServiceFormValues>
  existingImageUrl?: string | null
}

export function ServiceFormFields({
  form,
  existingImageUrl,
}: ServiceFormFieldsProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(
    existingImageUrl ?? null
  )
  const [dragActive, setDragActive] = useState(false)

  const selectedOfferings = form.watch("additionalOfferings")

  const handleAddOffering = (offering: string) => {
    const current = form.getValues("additionalOfferings")
    if (!current.includes(offering)) {
      form.setValue("additionalOfferings", [...current, offering])
    }
  }

  const handleRemoveOffering = (offering: string) => {
    const current = form.getValues("additionalOfferings")
    form.setValue(
      "additionalOfferings",
      current.filter((o) => o !== offering)
    )
  }

  const handleImageChange = useCallback(
    (file: File | null) => {
      if (file) {
        if (file.size > 5 * 1024 * 1024) {
          form.setError("image", { message: "File size must be less than 5MB" })
          return
        }
        if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
          form.setError("image", {
            message: "Only JPEG, JPG, and PNG files are supported",
          })
          return
        }
        form.clearErrors("image")
        form.setValue("image", file)
        const reader = new FileReader()
        reader.onloadend = () => {
          setImagePreview(reader.result as string)
        }
        reader.readAsDataURL(file)
      }
    },
    [form]
  )

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleImageChange(e.dataTransfer.files[0])
      }
    },
    [handleImageChange]
  )

  const removeImage = () => {
    form.setValue("image", null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const availableOfferings = ADDITIONAL_OFFERINGS.filter(
    (o) => !selectedOfferings.includes(o)
  )

  return (
    <>
      {/* Title */}
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Title <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Input placeholder="Enter service title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Description */}
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Description <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter service description"
                rows={3}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Estimated Completion Time */}
      <FormField
        control={form.control}
        name="estimatedCompletionDays"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Estimated Completion Time (Days){" "}
              <span className="text-destructive">*</span>
            </FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select days" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {COMPLETION_DAYS.map((day) => (
                  <SelectItem key={day} value={String(day)}>
                    {day} {day === 1 ? "day" : "days"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Price MYR */}
      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Price (MYR) <span className="text-destructive">*</span>
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  RM
                </span>
                <Input
                  type="text"
                  inputMode="decimal"
                  placeholder="0.00"
                  className="pl-10"
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Additional Offerings */}
      <FormField
        control={form.control}
        name="additionalOfferings"
        render={() => (
          <FormItem>
            <FormLabel>Additional Offerings</FormLabel>
            <Select
              onValueChange={(value) => {
                handleAddOffering(value)
              }}
              value=""
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select offerings" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {availableOfferings.length > 0 ? (
                  availableOfferings.map((offering) => (
                    <SelectItem key={offering} value={offering}>
                      {offering}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-2 py-1.5 text-sm text-muted-foreground">
                    All offerings selected
                  </div>
                )}
              </SelectContent>
            </Select>

            {selectedOfferings.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedOfferings.map((offering) => (
                  <Badge
                    key={offering}
                    variant="secondary"
                    className="gap-1 pr-1"
                  >
                    {offering}
                    <button
                      type="button"
                      onClick={() => handleRemoveOffering(offering)}
                      className="ml-1 rounded-full p-0.5 hover:bg-muted-foreground/20"
                      aria-label={`Remove ${offering}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Image Upload */}
      <FormField
        control={form.control}
        name="image"
        render={() => (
          <FormItem>
            <FormLabel>Service Image</FormLabel>
            <FormControl>
              <div
                className={`relative rounded-lg border-2 border-dashed transition-colors ${
                  dragActive
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Service preview"
                      className="h-40 w-full rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute right-2 top-2 rounded-full bg-background/80 p-1 backdrop-blur-sm hover:bg-background"
                      aria-label="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div
                    className="flex cursor-pointer flex-col items-center gap-2 p-6"
                    onClick={() => fileInputRef.current?.click()}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        fileInputRef.current?.click()
                      }
                    }}
                  >
                    <div className="rounded-full bg-muted p-3">
                      <ImagePlus className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        JPEG, JPG, PNG (Max 5MB)
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpeg,.jpg,.png"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0] ?? null
                    handleImageChange(file)
                  }}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
