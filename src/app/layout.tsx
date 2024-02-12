import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

import NavBar from "./ui/home/nav-bar";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Relaxat",
  description: "Health and wellness booking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
