"use client";

import { useEffect, useState } from "react";
import { Package, Truck, CheckCircle2, Clock, Map, TrendingUp, AlertCircle, XCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();
  
  const [stats, setStats] = useState<any>(null);
  const [hubs, setHubs] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!user || dbUser?.role !== "ADMIN") {
        router.push("/dashboard"); // Redirect non-admins
      }
    }
  }, [user, dbUser, loading, router]);

  useEffect(() => {
    if (dbUser?.role === "ADMIN") {
      fetch(`/api/admin/stats`)
        .then(res => res.json())
        .then(data => {
          if (data.metrics) setStats(data.metrics);
          if (data.hubs) setHubs(data.hubs);
          setIsLoadingData(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoadingData(false);
        });
    }
  }, [dbUser]);

  if (loading || isLoadingData) {
    return <div className="p-8 text-center text-slate-500">Loading admin dashboard...</div>;
  }

  if (!user || dbUser?.role !== "ADMIN") return null;

  const metrics = [
    { label: "Total Shipments", value: stats?.totalShipments || 0, trend: "+12%", icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Today's Shipments", value: stats?.todayShipments || 0, trend: "+5%", icon: Package, color: "text-indigo-600", bg: "bg-indigo-100" },
    { label: "In Transit", value: stats?.inTransit || 0, trend: "-2%", icon: Truck, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Delivered", value: stats?.delivered || 0, trend: "+4%", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pending", value: stats?.pending || 0, trend: "-10%", icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100" },
    { label: "Cancelled/Returned", value: stats?.cancelled || 0, trend: "-50%", icon: XCircle, color: "text-red-600", bg: "bg-red-100" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Enterprise Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Real-time overview of Surya Delivery logistics network.</p>
        </div>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${m.bg} ${m.color}`}>
                <m.icon className="h-5 w-5" />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{m.value}</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{m.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Placeholder for Charts */}
        <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col min-h-[300px]">
          <h3 className="font-bold text-slate-900 mb-6">Shipment Volume (Last 7 Days)</h3>
          <div className="flex-1 border-2 border-dashed border-slate-100 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
            [ Interactive Chart Component Rendered Here ]
          </div>
        </div>

        {/* Live Tracking Feed / Alerts */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm flex flex-col min-h-[300px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900">System Alerts</h3>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full">0 New</span>
          </div>
          
          <div className="space-y-4 flex-1 flex items-center justify-center text-slate-400">
            <p className="text-sm">No new alerts at this time.</p>
          </div>
          
          <button className="w-full text-sm font-medium text-primary hover:text-orange-700 mt-4 text-center">
            View All Alerts
          </button>
        </div>
      </div>

      {/* Hub Status Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-bold text-slate-900">Hub Network Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-medium text-xs">
              <tr>
                <th className="px-6 py-4">Hub Name</th>
                <th className="px-6 py-4">Code</th>
                <th className="px-6 py-4">Current Load (Shipments)</th>
                <th className="px-6 py-4">Vehicles Available</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {hubs.map((hub, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium text-slate-900">{hub.name}</td>
                  <td className="px-6 py-4 font-mono text-slate-600">{hub.code}</td>
                  <td className="px-6 py-4 text-slate-600">{hub._count?.currentShipments || 0}</td>
                  <td className="px-6 py-4 text-slate-600">{hub._count?.vehicles || 0}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full text-green-600 bg-green-50`}>
                      Operational
                    </span>
                  </td>
                </tr>
              ))}
              {hubs.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-4 text-center text-slate-500">No hubs configured yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
