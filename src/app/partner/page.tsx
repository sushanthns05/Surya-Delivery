"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Package, ShieldCheck, CheckCircle2, ChevronRight, XCircle, Camera } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function PartnerDashboard() {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("pending");
  const [showOtpInput, setShowOtpInput] = useState<string | null>(null);
  const [pending, setPending] = useState<any[]>([]);
  const [completed, setCompleted] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user || (dbUser?.role !== "DELIVERY_PARTNER" && dbUser?.role !== "ADMIN")) {
        // If not a partner, redirect
        if (dbUser?.role === "CUSTOMER") {
          router.push("/dashboard");
        }
      }
    }
  }, [user, dbUser, loading, router]);

  useEffect(() => {
    if (dbUser && (dbUser.role === "DELIVERY_PARTNER" || dbUser.role === "ADMIN")) {
      fetch(`/api/partner/deliveries`)
        .then(res => res.json())
        .then(data => {
          if (data.pending) setPending(data.pending);
          if (data.completed) setCompleted(data.completed);
          setIsLoadingData(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoadingData(false);
        });
    }
  }, [dbUser]);

  if (loading || isLoadingData) {
    return <div className="p-8 text-center text-slate-500">Loading partner dashboard...</div>;
  }

  if (!user || (dbUser?.role !== "DELIVERY_PARTNER" && dbUser?.role !== "ADMIN")) return null;

  const deliveries = activeTab === "pending" ? pending : completed;

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl mx-auto">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Today's Deliveries</h1>
        <p className="text-slate-500 text-sm mt-1">You have {pending.length} packages assigned for today.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 flex gap-4">
        <div className="flex-1 text-center">
          <p className="text-xs font-medium text-slate-500 uppercase">Pending</p>
          <p className="text-2xl font-bold text-slate-900">{pending.length}</p>
        </div>
        <div className="w-px bg-slate-100"></div>
        <div className="flex-1 text-center">
          <p className="text-xs font-medium text-slate-500 uppercase">Completed</p>
          <p className="text-2xl font-bold text-green-600">{completed.length}</p>
        </div>
        <div className="w-px bg-slate-100"></div>
        <div className="flex-1 text-center">
          <p className="text-xs font-medium text-slate-500 uppercase">Earnings</p>
          <p className="text-2xl font-bold text-primary">₹{completed.length * 40}</p>
        </div>
      </div>

      <div className="flex bg-slate-200 p-1 rounded-lg">
        <button 
          onClick={() => setActiveTab("pending")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'pending' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          Pending ({pending.length})
        </button>
        <button 
          onClick={() => setActiveTab("completed")}
          className={`flex-1 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'completed' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500'}`}
        >
          Completed ({completed.length})
        </button>
      </div>

      <div className="space-y-4">
        {deliveries.map((delivery) => (
          <div key={delivery.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex justify-between items-start">
              <div>
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium mb-2 ${activeTab === 'completed' ? 'bg-green-50 text-green-700 ring-1 ring-inset ring-green-600/20' : 'bg-orange-50 text-orange-700 ring-1 ring-inset ring-orange-600/20'}`}>
                  {delivery.deliveryType}
                </span>
                <h3 className="font-bold text-slate-900">{delivery.trackingId}</h3>
                <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                  <Package className="h-3.5 w-3.5" /> {delivery.packageCategory} ({delivery.weight} kg)
                </p>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-slate-900">{delivery.deliveryAddress?.name || "Unknown Customer"}</p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    {delivery.deliveryAddress?.address}, {delivery.deliveryAddress?.area}, {delivery.deliveryAddress?.city}, {delivery.deliveryAddress?.pinCode}
                  </p>
                </div>
              </div>
            </div>

            {activeTab === "pending" && (
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
                {showOtpInput !== delivery.id ? (
                  <>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1 bg-white">
                        <MapPin className="mr-2 h-4 w-4" /> Navigate
                      </Button>
                      <Button variant="outline" className="flex-1 bg-white text-green-700 border-green-200 hover:bg-green-50">
                        <Phone className="mr-2 h-4 w-4" /> Call
                      </Button>
                    </div>
                    <Button onClick={() => setShowOtpInput(delivery.id)} className="w-full">
                      <ShieldCheck className="mr-2 h-4 w-4" /> Mark Delivered
                    </Button>
                  </>
                ) : (
                  <div className="space-y-3 animate-in slide-in-from-bottom-2">
                    <p className="text-sm font-medium text-slate-900 text-center">Enter 4-digit OTP provided by customer</p>
                    <div className="flex gap-2 justify-center">
                      {[1,2,3,4].map((i) => (
                        <input key={i} type="text" maxLength={1} className="w-12 h-14 text-center text-xl font-bold rounded-lg border-2 border-slate-300 focus:border-primary focus:ring-0 outline-none" />
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" className="flex-1 bg-white" onClick={() => setShowOtpInput(null)}>
                        Cancel
                      </Button>
                      <Button className="flex-1 bg-green-600 hover:bg-green-700">
                        Verify & Complete
                      </Button>
                    </div>
                    <div className="flex justify-between items-center px-2">
                        <button className="text-xs text-red-600 font-medium flex items-center gap-1"><XCircle className="h-3.5 w-3.5"/> Failed Delivery</button>
                        <button className="text-xs text-slate-600 font-medium flex items-center gap-1"><Camera className="h-3.5 w-3.5"/> Take Photo</button>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === "completed" && (
              <div className="p-4 bg-green-50 border-t border-green-100 flex flex-col gap-3 text-center text-green-700 text-sm font-medium">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-5 w-5" /> Delivered Successfully
                </div>
              </div>
            )}
          </div>
        ))}
        {deliveries.length === 0 && (
          <div className="text-center p-8 border-2 border-dashed border-slate-200 rounded-xl">
            <p className="text-slate-500 font-medium">No deliveries found in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
}
