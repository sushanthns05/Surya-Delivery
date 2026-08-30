"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Truck } from "lucide-react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // For now, redirect everyone to dashboard. 
      // Later we can check role and redirect to /admin or /partner
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-md w-full">
          
          <div className="flex flex-col items-center mb-8">
            <div className="h-12 w-12 bg-orange-100 text-primary rounded-xl flex items-center justify-center mb-4">
              <Truck className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
            <p className="text-slate-500 mt-1 text-center">Log in to your Surya Delivery account.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder="Enter email"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <a href="#" className="text-sm text-primary hover:underline">Forgot?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                placeholder="••••••••"
              />
            </div>
            
            <div className="pt-2">
              <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                {isLoading ? "Logging In..." : "Log In"}
              </Button>
            </div>
          </form>

          <div className="mt-8 flex flex-col gap-3">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-sm"><span className="bg-white px-2 text-slate-500">Or log in as</span></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/admin"><Button variant="outline" className="w-full">Admin</Button></Link>
              <Link href="/partner"><Button variant="outline" className="w-full">Partner</Button></Link>
            </div>
          </div>
          
          <p className="text-center text-sm text-slate-500 mt-8">
            Don't have an account? <Link href="/signup" className="font-medium text-primary hover:underline">Sign up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
