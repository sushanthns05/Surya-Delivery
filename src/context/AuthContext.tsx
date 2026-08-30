"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

interface DBUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  role: string;
}

interface AuthContextType {
  user: FirebaseUser | null;
  dbUser: DBUser | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  dbUser: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [dbUser, setDbUser] = useState<DBUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser?.email) {
        try {
          const res = await fetch(`/api/auth/me?email=${encodeURIComponent(firebaseUser.email)}`);
          if (res.ok) {
            const data = await res.json();
            setDbUser(data.user);
          } else {
            setDbUser(null);
          }
        } catch (error) {
          console.error("Failed to fetch DB user:", error);
          setDbUser(null);
        }
      } else {
        setDbUser(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await auth.signOut();
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, dbUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
