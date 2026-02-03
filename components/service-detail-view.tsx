'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, Bookmark } from 'lucide-react';
import Image from 'next/image';

export function ServiceDetailView() {
  const { setEditingServiceId } = useDashboardStore();

  return (
    <div className="max-w-6xl">
      {/* Top Section */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Register a new company | Private Limited - Sdn Bhd
          </h1>
          <div className="flex gap-3 mt-4">
            <Button size="sm" variant="default" className="gap-2">
              Edit
              <Edit className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="outline" className="gap-2 bg-transparent">
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-8">
        {/* Left Section - Images & Info */}
        <div className="col-span-2 space-y-6">
          {/* Images Gallery */}
          <div className="space-y-3">
            <div className="bg-muted rounded-lg p-8 h-48 flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="w-12 h-12 bg-border rounded mx-auto mb-3" />
                <p className="text-muted-foreground text-sm">Add first image to show here</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-gray-900 to-gray-700 rounded-lg p-4 h-40 flex items-center justify-center text-white font-bold text-center">
                10 Best Company Secretarial in Johor Bahru
              </div>
              <div className="bg-red-400 rounded-lg h-40 flex items-end justify-start p-4">
                <div className="text-white text-sm">A Company Secretary Represent & How to Hire in any Business</div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Description</h2>
            <p className="text-muted-foreground text-sm">Describe your service here</p>
          </div>

          {/* Additional Offerings */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Additional Offerings</h2>
            <p className="text-muted-foreground text-sm">Enhance your service by adding additional offerings</p>

            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <input type="checkbox" className="h-4 w-4" defaultChecked />
                <span className="text-sm text-foreground">Company Secretary Subscription</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <input type="checkbox" className="h-4 w-4" defaultChecked />
                <span className="text-sm text-foreground">Company Branding Services</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <input type="checkbox" className="h-4 w-4" defaultChecked />
                <span className="text-sm text-foreground">Annual Filing & Compliance</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                <input type="checkbox" className="h-4 w-4" defaultChecked />
                <span className="text-sm text-foreground">Yearly Filing / Compliance</span>
              </div>
            </div>
          </div>

          {/* Company Secretary */}
          <div className="space-y-3 border-t border-border pt-6">
            <h2 className="text-lg font-semibold text-foreground">Company Secretary</h2>

            <div className="flex gap-4">
              {/* Avatar */}
              <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex-shrink-0" />

              {/* Info */}
              <div className="flex-1 space-y-2">
                <div>
                  <p className="font-semibold text-foreground text-sm">Gwen Lam</p>
                  <p className="text-xs text-muted-foreground">CEO</p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  Verified
                </Badge>

                {/* Certifications */}
                <div className="flex gap-2 mt-3">
                  <div className="w-6 h-6 bg-blue-500 rounded text-white flex items-center justify-center text-xs font-bold">
                    C
                  </div>
                  <div className="w-6 h-6 bg-purple-500 rounded text-white flex items-center justify-center text-xs font-bold">
                    S
                  </div>
                </div>

                <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                  Brand Lorem Ipsum Dolor Sit Amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Professional Fee Card */}
        <div className="col-span-1">
          <div className="border border-border rounded-lg p-6 sticky top-8 space-y-4">
            <h2 className="text-xl font-bold text-foreground">Professional Fee</h2>
            <p className="text-xs text-muted-foreground">Just a note for your service</p>

            {/* Price */}
            <div className="text-center py-6 border-b border-border">
              <p className="text-4xl font-bold text-foreground">RM 1,800</p>
            </div>

            {/* Breakdown */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base price</span>
                <span className="font-medium text-foreground">RM 1,800</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service processing fee</span>
                <span className="font-medium text-foreground">RM 540</span>
              </div>
              <div className="border-t border-border pt-3 flex justify-between font-semibold">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">RM 2,340</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Your returns</span>
                <span className="font-medium text-foreground">RM 1,800</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
