'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface PublishChangesDialogProps {
  open: boolean
  onClose: () => void
  onSave: () => void
}

export function PublishChangesDialog({
  open,
  onClose,
  onSave
}: PublishChangesDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold flex items-center gap-2 text-4xl">
            <span className="text-4xl">!</span>
            Publish changes
          </DialogTitle>

          <DialogDescription className="text-sm text-muted-foreground mt-2">
            Do you want to publish these changes? It will appear in the marketplace listing.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Continue Editing
          </Button>

          <Button onClick={onSave}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
