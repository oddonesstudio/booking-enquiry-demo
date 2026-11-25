import type { Metadata } from "next";
import { Roboto, Staatliches } from "next/font/google";

import { SiteFooter } from "@/ui/navigation/SiteFooter";
import { SiteHeader } from "@/ui/navigation/SiteHeader";

import "./styles/globals.css";
import { BookingDialog } from "@/components/BookingDialog";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
};

const staatliches = Staatliches({
  subsets: ["latin"],
  variable: "--font-staatliches",
  weight: "400",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "600"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${staatliches.variable} ${roboto.variable}`}>
        <SiteHeader />
        {children}
        <SiteFooter />
        <BookingDialog />
      </body>
    </html>
  );
}
