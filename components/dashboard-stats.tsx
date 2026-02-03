'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import { Card, CardContent } from './ui/card';
import { TrendingUp, Users, ShoppingCart, DollarSign } from 'lucide-react';

export function DashboardStats() {
  const { services } = useDashboardStore();

  const totalServices = services.length;
  const totalPurchases = services.reduce((sum, s) => sum + s.purchases, 0);
  const totalRevenue = services.reduce((sum, s) => sum + s.price * s.purchases, 0);
  const publishedServices = services.filter(
    (s) => s.publishStatus === 'published'
  ).length;

  const stats = [
    {
      label: 'Total Services',
      value: totalServices,
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      label: 'Published',
      value: publishedServices,
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      label: 'Total Purchases',
      value: totalPurchases,
      icon: Users,
      color: 'text-purple-600'
    },
    {
      label: 'Total Revenue',
      value: `RM ${(totalRevenue / 1000).toFixed(1)}k`,
      icon: DollarSign,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="border-border">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">
                    {stat.value}
                  </p>
                </div>
                <Icon className={`h-8 w-8 ${stat.color} opacity-20`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
