import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientProvider from "@/utils/clientProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const clashDisplay = localFont({
  src: [
    {
      path: "/fonts/ClashDisplay-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "/fonts/ClashDisplay-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "/fonts/ClashDisplay-Semibold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "/fonts/ClashDisplay-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-clash-display",
});

export const metadata: Metadata = {
  title: "Trazen",
  description: "A web3 discovery platform",
  icons: "/favicon.svg"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const cookie = headersList.get("cookie") ?? "";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.className} antialiased`}
      >
        <ClientProvider cookie={cookie}>{children}</ClientProvider>
      </body>
    </html>
  );
}
