'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { PublishChangesDialog } from './PublishChangesDialog';
import { useRouter } from 'next/navigation';
import { Spinner } from './ui/spinner';

export function ServiceDetailView({ serviceId }: { serviceId: string }) {
  const { setSpecialistd, singleSpecialist, updateServiceStatus, updateServiceStatusUnpublish } = useDashboardStore();
  const [open, setOpen] = useState(false)

  const router = useRouter()



  useEffect(() => {
    setSpecialistd(serviceId);
  }, [serviceId, setSpecialistd]);

  if (!singleSpecialist) {
    return <Spinner className="text-muted-foreground" />;
  }

  const {
    title,
    description,
    basePrice,
    finalPrice,
    platformFee,
    durationDays,
    isVerified,
    media,
    user
  } = singleSpecialist;


  const handlePublish = () => {
    updateServiceStatus(serviceId)
    setOpen(true)
  }

  const handleUnpublish = () => {
    updateServiceStatusUnpublish(serviceId)
    setOpen(true)
  } 



  return (
    <div className="max-w-6xl">
      {/* Top Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>

          <div className="flex gap-3 mt-4">
            <Button size="sm" className="gap-2">
              Edit <Edit className="h-4 w-4" />
            </Button>
            {singleSpecialist.verificationStatus === "PENDING" ? (
              <Button onClick={handlePublish} size="sm" variant="default" className="gap-2 coursor-pointer">
                Publish
              </Button>
            ) : (
              <Badge onClick={handleUnpublish} className="text-sm coursor-pointer">
                unpublished
              </Badge>
            )}

            <Button size="sm" variant="outline">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left */}
        <div className="col-span-2 space-y-6">
          {/* Media */}
          <div className="space-y-3">
            {media.length === 0 ? (
              <div className="bg-muted rounded-lg p-8 h-48 flex items-center justify-center border">
                <p className="text-muted-foreground text-sm">
                  Add first image to show here
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {media.map((item: any) => (
                  <div key={item.id} className="relative h-40 rounded-lg overflow-hidden">
                    <Image
                      src={item.url}
                      alt="Service media"
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>

          {/* Specialist */}
          <div className="space-y-3 border-t pt-6">
            <h2 className="text-lg font-semibold">Service Provider</h2>

            <div className="flex gap-4">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg" />

              <div className="space-y-2">
                <p className="font-semibold text-sm">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>

                {isVerified && (
                  <Badge variant="secondary" className="text-xs">
                    Verified
                  </Badge>
                )}

                <p className="text-xs text-muted-foreground mt-3">
                  Delivery in {durationDays} days
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right – Price Card */}
        <div className="col-span-1">
          <div className="border rounded-lg p-6 sticky top-8 space-y-4">
            <h2 className="text-xl font-bold">Professional Fee</h2>

            <div className="text-center py-6 border-b">
              <p className="text-4xl font-bold">৳ {finalPrice}</p>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base price</span>
                <span className="font-medium">৳ {basePrice}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Platform fee</span>
                <span className="font-medium">৳ {platformFee}</span>
              </div>

              <div className="border-t pt-3 flex justify-between font-semibold">
                <span>Total</span>
                <span>৳ {finalPrice}</span>
              </div>
            </div>
          </div>
        </div>
        <PublishChangesDialog
          open={open}
          onClose={() => setOpen(false)}
          onSave={() => {
            console.log('Saved!')
            setOpen(false)
            router.push("/")
            router.refresh()
          }}
        />
      </div>
    </div>
  );
}
