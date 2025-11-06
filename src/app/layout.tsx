import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { defaultMetadata } from "@/lib/metadata";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import StructuredData from "@/components/StructuredData";
import SEOContent, { SEOBreadcrumbs } from "@/components/SEOContent";
import { ProgramsProvider } from '@/contexts/ProgramsContext';
import { ReviewsProvider } from '@/contexts/ReviewsContext';
import { ContactsProvider } from '@/contexts/ContactsContext';
import "../styles/globals.scss";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico?v=2" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png?v=2" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png?v=2" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=2" />
        <StructuredData />
        <SEOBreadcrumbs />
      </head>
      <body className={inter.variable}>
        <ProgramsProvider>
          <ReviewsProvider>
            <ContactsProvider>
              <SmoothScrollProvider>
                {children}
                <SEOContent />
              </SmoothScrollProvider>
            </ContactsProvider>
          </ReviewsProvider>
        </ProgramsProvider>
      </body>
    </html>
  );
}
