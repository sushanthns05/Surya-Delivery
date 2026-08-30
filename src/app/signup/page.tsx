"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password should be at least 6 characters.");
      return;
    }

    setIsLoading(true);

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // 2. Update Firebase profile
      await updateProfile(user, { displayName: formData.name });

      // 3. Save to PostgreSQL database
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          name: formData.name,
          phone: formData.phone,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to register in database.");
      }

      setSuccess("Account created successfully! Redirecting...");
      
      // Redirect to dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
          <div>
            <h2 className="mt-2 text-center text-3xl font-extrabold text-slate-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
              Join Surya Delivery today
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleSignup}>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            {success && (
              <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}

            <div className="space-y-4 rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="email" className="text-sm font-medium text-slate-700">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number (Optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="text-sm font-medium text-slate-700">Confirm Password</label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full h-10 px-3 mt-1 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </div>
            
            <div className="text-center text-sm">
              <span className="text-slate-600">Already have an account? </span>
              <Link href="/login" className="font-medium text-primary hover:text-orange-500">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
