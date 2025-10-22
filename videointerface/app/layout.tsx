import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

// Import ClerkProvider to wrap the application
import { ClerkProvider } from "@clerk/nextjs"; 
// Import custom Clerk theme utilities (if needed, assuming 'dark' theme)
import { dark } from "@clerk/themes"; 

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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
