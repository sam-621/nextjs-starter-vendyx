import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';

import { ToastProvider } from '@/shared/components/ui/toast';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Vendyx Storefront',
  description: 'Storefront built on Vendyx'
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="es" className={`${inter.variable} ${geistMono.variable} antialiased`}>
      <body>
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
