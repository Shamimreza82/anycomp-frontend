import { z } from "zod"

export const ADDITIONAL_OFFERINGS = [
  "Express Delivery",
  "Gift Wrapping",
  "Insurance Coverage",
  "Priority Support",
  "Installation Service",
  "Extended Warranty",
  "Consultation",
  "Training Session",
  "Maintenance Package",
  "Custom Design",
  "Home Visit",
  "24/7 Support",
] as const

export const COMPLETION_DAYS = Array.from({ length: 30 }, (_, i) => i + 1)

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"]

export const serviceSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
  estimatedCompletionDays: z
    .string()
    .min(1, "Estimated completion time is required"),
  price: z
    .string()
    .min(1, "Price is required")
    .refine(
      (val) => !isNaN(Number(val)) && Number(val) > 0,
      "Price must be a valid positive number"
    ),
  additionalOfferings: z
    .array(z.string())
    .default([]),
  image: z
    .custom<File | null>()
    .optional()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "File size must be less than 5MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only JPEG, JPG, and PNG files are supported"
    ),
})

export type ServiceFormValues = z.infer<typeof serviceSchema>

export interface Service extends Omit<ServiceFormValues, "image"> {
  id: string
  imageUrl: string | null
  createdAt: string
}
