import "./globals.css";
import "@repo/ui/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../provider";
// import { AppbarClient } from "../components/NavbarClient";
import {NavbarClient} from "../components/NavbarClient";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bard",
  description: "A Web Wallet",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* console.log(inter.className); */}
      
      <body className={inter.className}>
        <Providers>
          {/* <AppbarClient /> */}
          <NavbarClient/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
