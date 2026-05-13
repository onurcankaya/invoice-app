import { type ReactNode } from 'react';
import Sidebar from './Sidebar';

type PageLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: PageLayoutProps) {
  return (
    <main className="relative h-full flex bg-dark">
      <Sidebar />
      <div className="h-full max-w-3xl mx-auto w-full py-20">{children}</div>
    </main>
  );
}
