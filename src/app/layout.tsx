import type { Metadata } from 'next';
import { Geist_Mono, Inter } from 'next/font/google';

import { getShop } from '@/lib/shop/data/get-shop';
import { ToastProvider } from '@/shared/components/ui/toast';
import { SITE_URL } from '@/shared/utils/site-url';

import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const generateMetadata = async (): Promise<Metadata> => {
  const shop = await getShop();
  const name = shop?.name ?? 'Tienda';

  return {
    metadataBase: new URL(SITE_URL),
    title: { template: `%s | ${name}`, default: name },
    openGraph: { siteName: name, locale: 'es_MX', type: 'website' },
    icons: shop?.logo ? { icon: shop.logo } : undefined
  };
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
