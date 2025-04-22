'use client';

import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {children}
        </main>
        <footer className="bg-white p-4 shadow-inner text-center text-gray-500 text-sm">
          Sistema de Gestão Gastronômica &copy; {new Date().getFullYear()}
        </footer>
      </div>
    </div>
  );
}
