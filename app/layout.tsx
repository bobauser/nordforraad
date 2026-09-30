import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces, Sora } from "next/font/google"; // TODO: remove geist and geistmono later
import "./globals.css";
import TopBar from "./components/topbar";
import { UserProvider } from "./context/userContext";
import * as userService from "@/app/services/userService"

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  variable: "--font-fraunces",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nordforråd",
  description: "App for å lære nye ord!",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await userService.getCurrentUser();
  

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <UserProvider initialUser={user}>
          <TopBar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
