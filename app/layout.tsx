import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'সুঁই সুতার গল্প | Traditional Bangladeshi Handmade Fashion',
  description: 'Hand-painted Sarees, Three-piece outfits, Panjabi, Shawls & Embroidered Clothing from Feni, Bangladesh.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}