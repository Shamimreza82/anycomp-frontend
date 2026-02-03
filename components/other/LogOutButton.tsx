"use client"

import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const {logout} = useAuth()
const router = useRouter()


    
 const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally, show an error message to the user
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={handleLogout}
      className="flex items-center gap-2 hover:text-destructive"
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  )
}