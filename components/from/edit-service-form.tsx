"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Save } from "lucide-react"

import {
  serviceSchema,
  type ServiceFormValues,
  type Service,
} from "@/lib/service-schema"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Form } from "@/components/ui/form"
import { ServiceFormFields } from "./service-form-fields"


interface EditServiceFormProps {
  service: Service
  onSuccess: () => void
  onCancel: () => void
}

function buildFormData(
  values: ServiceFormValues,
  hasExistingImage: boolean
): FormData {
  const formData = new FormData()
  formData.append("title", values.title)
  formData.append("description", values.description)
  formData.append("estimatedCompletionDays", values.estimatedCompletionDays)
  formData.append("price", values.price)
  for (const offering of values.additionalOfferings) {
    formData.append("additionalOfferings", offering)
  }
  if (values.image) {
    formData.append("image", values.image)
  } else if (hasExistingImage) {
    formData.append("keepExistingImage", "true")
  }
  return formData
}

export function EditServiceForm({
  service,
  onSuccess,
  onCancel,
}: EditServiceFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: service.title,
      description: service.description,
      estimatedCompletionDays: service.estimatedCompletionDays,
      price: service.price,
      additionalOfferings: service.additionalOfferings,
      image: null,
    },
  })

  const handleSubmit = async (values: ServiceFormValues) => {
    setIsSubmitting(true)
    setApiError(null)

    try {
      const formData = buildFormData(values, !!service.imageUrl)

      const response = await fetch(`/api/services/${service.id}`, {
        method: "PUT",
        body: formData,
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to update service")
      }

      onSuccess()
    } catch (error) {
      setApiError(
        error instanceof Error ? error.message : "Something went wrong"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-5 px-1 pb-6"
        >
          <ServiceFormFields
            form={form}
            existingImageUrl={service.imageUrl}
          />

          {apiError && (
            <p className="text-sm text-destructive" role="alert">
              {apiError}
            </p>
          )}

          <Separator />

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? "Updating..." : "Update Service"}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 bg-transparent"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </ScrollArea>
  )
}
