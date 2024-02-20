import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/HeaderFooter/Navbar";
import { Toaster } from "@/components/ui/toaster";
import AddPost from "@/components/Events/AddPost";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Savdhaan India",
  description: "Hackloop 24",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" min-h-screen">
          <Navbar />
          {children}
          <Toaster />
          <div className="sticky bottom-5 w-full justify-end flex pr-5">
            <AddPost />
          </div>
        </div>
      </body>
    </html>
  );
}
