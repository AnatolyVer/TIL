import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import StoreProvider from "@/app/storeProvider";
import Snow from "./components/NewYearEvent/Snow";
import MusicPlayer from "@/app/components/NewYearEvent/Music";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "This I Love",
    description: "Created with love",
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png',
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
      {<StoreProvider>
          <Header/>
          <main className="pt-[72px] min-h-[calc(100vh)] flex flex-col">
              {children}
          </main>
          <Snow/>
          <MusicPlayer/>
      </StoreProvider>}
      </body>
    </html>
  );
}
