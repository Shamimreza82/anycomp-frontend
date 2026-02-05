import { Card } from '@/components/ui/card'
import Image from 'next/image'

interface ConsultantCardProps {
  name: string
  title: string
  description: string
  price: string
  image: string
}

export function ConsultantCard({
  name,
  title,
  description,
  price,
  image,
}: ConsultantCardProps) {
  return (
    <Card className="overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition">
      {/* Top Image */}
      <div className="relative h-44 w-full">
        <Image
          src={image || '/placeholder.svg'}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Avatar + Name */}
        <div className="flex items-center gap-3 mb-3">
          <div className="relative h-10 w-10 rounded-full overflow-hidden">
            <Image
              src={image || '/placeholder.svg'}
              alt={name}
              fill
              className="object-cover"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {name}
            </p>
            <p className="text-xs text-muted-foreground">
              {title}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price */}
        <p className="font-bold text-lg text-foreground">
          {price}
        </p>
      </div>
    </Card>
  )
}
