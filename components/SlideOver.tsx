'use client';

import * as React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";
import { X } from "lucide-react";

interface SlideOverProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function SlideOver({ isOpen, onClose, children, title = "Edit Service" }: SlideOverProps) {
  return (
    <Sheet open={isOpen} onOpenChange={(open) => {
      if (!open) onClose(); // Call onClose only when the sheet is closing
    }}>
      <SheetContent side="right">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>{title}</SheetTitle>
            <SheetClose asChild>
              <button className="text-gray-500 hover:text-gray-700">
                <X className="h-5 w-5" />
              </button>
            </SheetClose>
          </div>
        </SheetHeader>

        <div className="mt-4">
          {children}
        </div>
      </SheetContent>
    </Sheet>
  );
}
