'use client';

import { useDashboardStore } from '@/store/dashboardStore';
import {
  Store,
  Users,
  ShoppingCart,
  FileText,
  Mail,
  HelpCircle,
  Settings
} from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { LogoutButton } from './other/LogOutButton';

const storeMenuItems = [
  { icon: Store, label: 'Consultation Center Services', id: 'store', subtext: 'Company Secretaryy, Etc' }
];

const menuItems = [
  { icon: Users, label: 'Specialists', id: 'specialists' },
  { icon: Users, label: 'Clients', id: 'clients' },
  { icon: ShoppingCart, label: 'Service Orders', id: 'orders' },
  { icon: Mail, label: 'Messages', id: 'messages' },
  { icon: FileText, label: 'Invoices & Receipts', id: 'invoices' }
];

const bottomMenuItems = [
  { icon: HelpCircle, label: 'Help', id: 'help' },
  { icon: Settings, label: 'Settings', id: 'settings' }
];


export function Sidebar() {
  const { activeMenu, setActiveMenu } = useDashboardStore();



  return (
    <div className="w-48 bg-background border-r border-border flex flex-col">
      {/* Logo/Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-xs font-bold text-foreground uppercase tracking-wider">Store</h2>
        <div className="flex items-center gap-2 mt-3 text-xs">
          <div className="w-6 h-6 bg-primary rounded text-primary-foreground flex items-center justify-center text-[10px] font-bold">
            C
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground text-xs">Consultation Center Services</p>
            <p className="text-muted-foreground text-[10px]">Company Secretaryy, Etc</p>
          </div>
        </div>
      </div>

      {/* Dashboard Section */}
      <div className="px-3 py-3 space-y-1">
        <p className="text-xs font-semibold text-muted-foreground px-2 uppercase">Dashboard</p>
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeMenu === item.id;
          return (
            <Button
              key={item.id}
              variant={isActive ? 'default' : 'ghost'}
              className={`w-full justify-start gap-3 px-3 py-2 h-auto font-normal rounded text-xs ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted'
              }`}
              onClick={() => setActiveMenu(item.id)}
            >
              <Icon className="h-3 w-3" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </div>
      {/* Bottom Menu */}

      <div className="border-t border-border px-2 py-2 space-y-1">
        <LogoutButton/>
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className="w-full justify-start gap-3 px-3 py-2 h-auto font-normal rounded text-foreground hover:bg-muted text-xs"
              onClick={() => setActiveMenu(item.id)}
            >
              <Icon className="h-3 w-3" />
              <span>{item.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
