'use client';

import { Header } from '@/components/hero/header';
import { Filters } from '@/components/hero/filters';
import { ConsultantsGrid } from '@/components/hero/consultants-grid';

export default function Home() {


  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">Register a New Company</h2>
          <p className="text-muted-foreground">Browse and connect with experienced consultants</p>
        </div>
        <Filters />
        <ConsultantsGrid />
      </main>
    </div>
  );
}
