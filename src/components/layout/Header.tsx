"use client";

import Link from "next/link";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { user, dbUser, logout, loading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6 mx-auto">
        <Link href="/" className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-primary">SURYA DELIVERY</span>
        </Link>
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/services" className="text-sm font-medium hover:text-primary transition-colors">Services</Link>
          <Link href="/track" className="text-sm font-medium hover:text-primary transition-colors">Track Shipment</Link>
          <Link href="/book" className="text-sm font-medium hover:text-primary transition-colors">Book Delivery</Link>
          <Link href="/business" className="text-sm font-medium hover:text-primary transition-colors">Business</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
        </nav>
        <div className="flex items-center gap-4">
          {!loading && (
            <>
              {user ? (
                <>
                  <Link href={dbUser?.role === "ADMIN" ? "/admin" : dbUser?.role === "DELIVERY_PARTNER" ? "/partner" : "/dashboard"}>
                    <Button variant="ghost" className="hidden sm:inline-flex">Dashboard</Button>
                  </Link>
                  <Button onClick={logout}>Logout</Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" className="hidden sm:inline-flex">Login</Button>
                  </Link>
                  <Link href="/signup">
                    <Button>Get Started</Button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
}
