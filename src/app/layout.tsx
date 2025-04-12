import { TooltipProvider } from "@/components/ui/tooltip";
import Providers from "@/providers/Providers";
import { Inter } from "next/font/google";
import React from "react";
import { Toaster } from "sonner";
import "./globals.scss";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "Finupsbd",
  description:
    "Brief info about FinsUp BD and its mission to empower financial decisions in Bangladesh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body className={`${inter.variable} antialiased`}>
          <Toaster position="top-center" richColors />
          <TooltipProvider>{children}</TooltipProvider>
        </body>
      </html>
    </Providers>
  );
}
