import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Eye, BookmarkIcon } from 'lucide-react';

export function ServiceListing() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Register a new company | Private Limited - Sdn Bhd
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Edit</Button>
          <Button variant="default" size="sm">Publish</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left - Service Images and Details */}
        <div className="col-span-2 space-y-6">
          {/* Service Images */}
          <Card className="p-0 overflow-hidden">
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <img 
                  src="/images/image.png"
                  alt="Company Secretarial"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <img 
                  src="/images/image.png"
                  alt="Company Secretarial"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </Card>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Description</h2>
            <Card className="p-4 bg-muted/50">
              <p className="text-sm text-muted-foreground">
                Describe your service here
              </p>
            </Card>
          </div>

          {/* Additional Offerings */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Additional Offerings</h2>
            <p className="text-sm text-muted-foreground">Enhance your service by adding additional offerings</p>
            
            <Card className="p-4 space-y-3">
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <input type="checkbox" id="secretary" className="rounded" />
                <label htmlFor="secretary" className="text-sm font-medium cursor-pointer flex-1">
                  Company Secretary Subscription
                </label>
              </div>
              <div className="flex items-center gap-2 pb-3 border-b border-border">
                <input type="checkbox" id="annual" className="rounded" />
                <label htmlFor="annual" className="text-sm font-medium cursor-pointer flex-1">
                  Annual Return Filing
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="accounting" className="rounded" />
                <label htmlFor="accounting" className="text-sm font-medium cursor-pointer flex-1">
                  Accounting Software Set-up
                </label>
              </div>
            </Card>
          </div>

          {/* Company Secretary Section */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Company Secretary</h2>
            <Card className="p-4">
              <div className="flex gap-4">
                <img 
                  src="/images/image.png"
                  alt="Profile"
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Certified Company Secretary</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Certified professional with extensive experience in corporate secretarial services
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">ACCA</Badge>
                    <Badge variant="secondary" className="text-xs">ICAEW</Badge>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right - Professional Fee Card */}
        <div className="col-span-1">
          <Card className="p-6 sticky top-6 bg-card border-2 border-border">
            <div className="space-y-6">
              {/* Fee Header */}
              <div>
                <h3 className="text-foreground font-semibold mb-1">Professional Fee</h3>
                <p className="text-xs text-muted-foreground">Set a rate for your service</p>
              </div>

              {/* Main Price */}
              <div className="border-b border-border pb-6">
                <div className="text-right">
                  <p className="text-3xl font-bold text-foreground">RM 1,800</p>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Base price</span>
                  <span className="text-sm font-medium text-foreground">RM 1,800</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Service processing fee</span>
                  <span className="text-sm font-medium text-foreground">RM 540</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="text-sm font-medium text-foreground">RM 2,340</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Your returns</span>
                  <span className="text-sm font-medium text-foreground">RM 1,800</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
