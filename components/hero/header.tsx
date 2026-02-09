'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Menu, X } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

export function Header() {
  const [open, setOpen] = useState(false)

  const {user, isAuthenticated} = useAuth()

  return (
    <header className="border-b border-border bg-white">
      <div className="mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-primary">ANYCOMP</h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#" className="nav-link">Registrar a empresa</Link>
          <Link href="#" className="nav-link">Agora é Consultores</Link>
          <Link href="#" className="nav-link">Company Background Services</Link>
          <Link href="#" className="nav-link">How Integrate Media</Link>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Search (desktop only) */}
          <div className="relative hidden lg:block">
            <Input
              type="text"
              placeholder="Search..."
              className="w-48 pr-10"
            />
            <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>

          {/* Login button */}
          {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">Dashboard</Button>
              </Link>
            ): <Link href="/login" className="w-full"> <Button variant="outline" className="w-full">Login</Button></Link>} 
            {/* <Link href="/dashboard">
                <Button variant="outline" className="w-full">Dashboard</Button>
              </Link>

          {/* Mobile menu toggle */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="flex flex-col gap-4 px-6 py-4">
            <Input type="text" placeholder="Search..." />

            <Link href="#" className="mobile-link">Registrar a empresa</Link>
            <Link href="#" className="mobile-link">Agora é Consultores</Link>
            <Link href="#" className="mobile-link">Company Background Services</Link>
            <Link href="#" className="mobile-link">How Integrate Media</Link>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">Dashboard</Button>
              </Link>
            ): <Link href="/login" className="w-full">Login</Link>}
            
          </div>
        </div>
      )}
    </header>
  )
}
