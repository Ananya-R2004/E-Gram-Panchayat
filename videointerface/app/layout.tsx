// app/layout.tsx

import { ReactNode } from "react";
import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import "./globals.css";

// 🛑 REMOVE THIS IMPORT:
// import StreamVideoProvider from '@/providers/StreamClientProvider'; 

// REQUIRED IMPORTS - these must be used as wrappers below
import { Toaster } from "@/components/ui/toaster";
import { ToastProvider } from "@/components/ui/use-toast"; 


const inter = Inter({ subsets: ["latin"] });

// ... metadata ...

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider
        // ... appearance props ... (KEEP THIS)
      >
        <body className={`${inter.className} bg-dark-2`}>
          
          <ToastProvider> 
            
            {/* 🛑 REMOVED StreamVideoProvider wrapper here */}
            {children} 
            <Toaster /> 

          </ToastProvider>

        </body>
      </ClerkProvider>
    </html>
  );
}