import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientProvider from "@/src/utils/clientProvider";

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
      path: "../../public/fonts/ClashDisplay-Light.woff2",
      style: "normal",
      weight: "300",
    },
    {
      path: "../../public/fonts/ClashDisplay-Medium.woff2",
      style: "normal",
      weight: "500",
    },
    {
      path: "../../public/fonts/ClashDisplay-Semibold.woff2",
      style: "normal",
      weight: "600",
    },
    {
      path: "../../public/fonts/ClashDisplay-Bold.woff2",
      style: "normal",
      weight: "700",
    },
  ],
  variable: "--font-clash-display",
});

export const metadata: Metadata = {
  title: "Trazen",
  description: "A web3 discovery platform",
  icons: "/favicon.svg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.className} antialiased`}
      >
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
