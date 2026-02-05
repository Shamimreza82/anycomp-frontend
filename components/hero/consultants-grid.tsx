'use client'

import { useEffect } from 'react'
import { usehomePageStore } from '@/store/homePageStore'
import { ConsultantCard } from './consultant-card'

export function ConsultantsGrid() {
  const { allSpecialist, getAllSpecialist } = usehomePageStore()

  useEffect(() => {
    getAllSpecialist()
  }, [getAllSpecialist])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {allSpecialist.map((s) => (
        <ConsultantCard
          key={s.id}
          name={s.user.fullName}
          title={s.title}
          description={s.description}
          price={`RM ${s.finalPrice}`}
          image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
        />
      ))}
    </div>
  )
}
