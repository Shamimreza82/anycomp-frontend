'use client'

import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ChevronDown } from 'lucide-react'

interface FiltersProps {
  onProChange?: (value: string) => void
  onSenioringChange?: (value: string) => void
}

export function Filters({ onProChange, onSenioringChange }: FiltersProps) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <Select defaultValue="all" onValueChange={onProChange}>
        <SelectTrigger className="w-32 bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Pro - All</SelectItem>
          <SelectItem value="pro">Pro Only</SelectItem>
          <SelectItem value="non-pro">Non-Pro</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue="all" onValueChange={onSenioringChange}>
        <SelectTrigger className="w-40 bg-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Senioring - All</SelectItem>
          <SelectItem value="senior">Senior</SelectItem>
          <SelectItem value="mid">Mid-Level</SelectItem>
          <SelectItem value="junior">Junior</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
