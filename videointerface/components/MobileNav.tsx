'use client';

import React from 'react';
import Image from "next/image";
import Link from 'next/link';
import { usePathname } from "next/navigation";

// Utility imports (assuming they exist)
import { cn } from "@/lib/utils"; 
import { sidebarLinks } from "@/constants"; 

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetHeader, 
  SheetTitle,  
} from "@/components/ui/sheet";

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger asChild>
          {/* Hamburger Icon size reverted to original 36x36 */}
          <Image
            src="/icons/hamburger.svg"
            width={36} 
            height={36} 
            alt="hamburger icon"
            className="cursor-pointer sm:hidden"
          />
        </SheetTrigger>

        <SheetContent side="left" className="border-none bg-dark-1">
          {/* Logo and App Name Header: Sizes restored to original values */}
          <Link href="/" className="flex items-center gap-1">
            <Image
              src="/icons/logo-egram.jpg" 
              width={32}                  // Restored size
              height={32}                 // Restored size
              alt="E-GramPanchayat Logo"  
              className="max-sm:size-10"  // Restored class
            />
            <p className="text-[26px] font-extrabold text-white max-sm:hidden">
              E-GramPanchayat             
            </p>
          </Link>
          
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <section className="flex h-full flex-col gap-6 pt-16 text-white">
                {/* MAP Sidebar Links */}
                {sidebarLinks.map((link) => {
                  // UPDATED LOGIC TO PREVENT DOUBLE ACTIVE STATE
                  const isActive = 
                    link.route === '/'
                      ? pathname === link.route // Home is active ONLY when path is exactly '/'
                      : pathname.startsWith(link.route); // Other routes use startsWith

                  return (
                    <SheetClose asChild key={link.label}>
                      <Link
                        href={link.route}
                        className={cn(
                          'flex gap-3 items-center p-3 rounded-lg justify-start', // Smaller padding
                          { 'bg-blue-1': isActive }
                        )}
                      >
                        {/* Link Icon and Text: Retained smaller sizes */}
                        <Image
                          src={link.imgUrl}
                          alt={link.label}
                          width={20} // Smaller size (20x20)
                          height={20}
                        />
                        <p className="text-base font-semibold"> 
                          {link.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

export default MobileNav;