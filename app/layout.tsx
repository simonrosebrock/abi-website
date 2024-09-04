import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react"
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["500"]});

export const metadata: Metadata = {
  title: "ABI 25",
  description: "Abitur 2025 am THG",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (    
    <html lang="en">
      <body className={`${poppins.className} background`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
