import { DashboardNav } from '@/components/dashboard/DashboardNav';
import Link from 'next/link'; // Assuming you're using Next.js

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-surface flex">
      <DashboardNav />
      <nav>
        <Link href="/dashboard/analytics" className="block px-4 py-2 rounded-lg hover:bg-surface transition-colors">
          Analytics & Kodlar
        </Link>
        <Link href="/dashboard/settings" className="block px-4 py-2 rounded-lg hover:bg-surface transition-colors">
          Ayarlar
        </Link>
      </nav>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
