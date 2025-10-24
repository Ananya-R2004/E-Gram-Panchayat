// app/layout.tsx

import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

// Import ClerkProvider to wrap the application
import { ClerkProvider } from "@clerk/nextjs"; 
// Import custom Clerk theme utilities (if needed, assuming 'dark' theme)
import { dark } from "@clerk/themes"; 

// 🚨 STEP 1: Import the ToastProvider from the correct path
import { ToastProvider } from "@/components/ui/use-toast"; 
// 🚨 STEP 2: Import the Toaster component (to actually display the toasts)
import { Toaster } from "@/components/ui/toaster"; // Assuming you have a Toaster component that reads the context

const inter = Inter({ subsets: ["latin"] });

// Set dynamic title and description
export const metadata: Metadata = {
  title: "E-GramPanchayat Video Platform",
  description: "A secure video conferencing platform for E-GramPanchayat services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 1. ClerkProvider MUST wrap the content to provide auth context
    <ClerkProvider
      // Optional: Apply a dark theme to Clerk components like UserButton, SignIn/Up pages
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#0E78F9', // Use blue-1 from your Tailwind config if defined
          colorBackground: '#1C1F2E', // Use dark-1 from your Tailwind config
          colorText: '#FFF',
        }
      }}
    >
      <html lang="en">
        {/* 2. Apply dark background and font class to the body */}
        <body className={`${inter.className} bg-dark-2`}>
          {/* 🚨 STEP 3: Wrap the children with the ToastProvider */}
          <ToastProvider>
            {children}
            {/* 🚨 STEP 4: Render the Toaster component outside of the children 
                 but within the ToastProvider to display the toasts globally */}
            <Toaster /> 
          </ToastProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

// NOTE: Make sure the path for ToastProvider and Toaster 
// (e.g., "@/components/ui/use-toast" and "@/components/ui/toaster") 
// is correct based on your project structure.