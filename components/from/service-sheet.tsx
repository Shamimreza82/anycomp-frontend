"use client"

import type { Service } from "@/lib/service-schema"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { CreateServiceForm } from "./create-service-form"
import { EditServiceForm } from "./edit-service-form"

interface CreateServiceSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function CreateServiceSheet({
  open,
  onOpenChange,
  onSuccess,
}: CreateServiceSheetProps) {
  const handleSuccess = () => {
    onSuccess()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader className="pb-4">
          <SheetTitle>Add New Service</SheetTitle>
          <SheetDescription>
            Fill in the details to create a new service.
          </SheetDescription>
        </SheetHeader>
        <CreateServiceForm
          onSuccess={handleSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  )
}

interface EditServiceSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: Service | null
  onSuccess: () => void
}

export function EditServiceSheet({
  open,
  onOpenChange,
  service,
  onSuccess,
}: EditServiceSheetProps) {
  const handleSuccess = () => {
    onSuccess()
    onOpenChange(false)
  }

  if (!service) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader className="pb-4">
          <SheetTitle>Edit Service</SheetTitle>
          <SheetDescription>
            Update the service details below.
          </SheetDescription>
        </SheetHeader>
        <EditServiceForm
          key={service.id}
          service={service}
          onSuccess={handleSuccess}
          onCancel={() => onOpenChange(false)}
        />
      </SheetContent>
    </Sheet>
  )
}
