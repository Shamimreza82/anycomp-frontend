'use client'

import { useEffect } from 'react'
import { usehomePageStore } from '@/store/homePageStore'
import { ConsultantCard } from './consultant-card'

export function ConsultantsGrid() {
  const { allSpecialist, getAllSpecialist } = usehomePageStore()

  useEffect(() => {
    getAllSpecialist()
  }, [getAllSpecialist])

  console.log(allSpecialist)
  if (allSpecialist.length === 0) {
    return (
      <p className="text-center text-muted-foreground">No consultants found.</p>
    )
  }

  if (allSpecialist.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {allSpecialist.map((s) => (
        <ConsultantCard
          key={s.id}
          name={s.user.fullName}
          title={s.title}
          description={s.description}
          price={`RM ${s.finalPrice}`}
          image={s.media.length > 0 ? s.media[0].url : '/placeholder-profile.png'}
        />
      ))}
    </div>
  )
}
