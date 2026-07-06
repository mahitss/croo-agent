import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import CommandPalette from "../components/CommandPalette";
import AiAssistant from "../components/AiAssistant";
import { ToastProvider } from "../components/Toast";
import DemoBanner from "../components/DemoBanner";
import AuthModal from "../components/AuthModal";
import ErrorBoundary from "../components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Orbit | Autonomous Agent OS",
  description: "The Operating System for the Autonomous AI Economy. Let your agents search, collaborate, and settle payments in USDC.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col font-sans`}>
        <ToastProvider>
          <ErrorBoundary>
            <DemoBanner />
            <Navbar />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <CommandPalette />
            <AiAssistant />
            <AuthModal />
          </ErrorBoundary>
        </ToastProvider>
      </body>
    </html>
  );
}
