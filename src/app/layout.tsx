import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { CartProvider } from '@/providers/CartProvider';
import { FavoritesProvider } from '@/providers/FavoritesProvider';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Monkey Business Media — Premium Themed Apparel',
    template: '%s | Monkey Business Media',
  },
  description:
    'Shop premium themed apparel for every lifestyle and passion. T-shirts, hoodies, mugs, and more — curated for your community.',
  keywords: ['apparel', 'themed clothing', 'custom t-shirts', 'hoodies', 'lifestyle apparel'],
  openGraph: {
    type: 'website',
    siteName: 'Monkey Business Media',
    title: 'Monkey Business Media — Premium Themed Apparel',
    description:
      'Shop premium themed apparel for every lifestyle and passion. Neutrally curated. Boldly worn.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.variable}>
      <body>
        <QueryProvider>
          <CartProvider>
            <FavoritesProvider>
              <Navbar />
              <main style={{ minHeight: 'calc(100vh - 200px)' }}>{children}</main>
              <Footer />
              <CartDrawer />
            </FavoritesProvider>
          </CartProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
