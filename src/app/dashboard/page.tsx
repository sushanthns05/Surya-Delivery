"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Package, Clock, CheckCircle2, RefreshCcw, Download, Eye, MapPin } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, dbUser, loading } = useAuth();
  const router = useRouter();
  
  const [shipments, setShipments] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (dbUser?.id) {
      fetch(`/api/user/shipments?userId=${dbUser.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.shipments) {
            setShipments(data.shipments);
          }
          setIsLoadingData(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoadingData(false);
        });
    }
  }, [dbUser]);

  if (loading || isLoadingData) {
    return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>;
  }

  if (!user) return null; // will redirect

  const activeCount = shipments.filter(s => ["PENDING", "IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(s.status)).length;
  const deliveredCount = shipments.filter(s => s.status === "DELIVERED").length;
  const pendingCount = shipments.filter(s => s.status === "PENDING").length;
  const returnCount = shipments.filter(s => ["RETURN_REQUESTED", "RETURNED"].includes(s.status)).length;

  const stats = [
    { label: "Active Shipments", value: activeCount.toString(), icon: Package, color: "text-blue-600", bg: "bg-blue-100" },
    { label: "Delivered", value: deliveredCount.toString(), icon: CheckCircle2, color: "text-green-600", bg: "bg-green-100" },
    { label: "Pending", value: pendingCount.toString(), icon: Clock, color: "text-orange-600", bg: "bg-orange-100" },
    { label: "Returns", value: returnCount.toString(), icon: RefreshCcw, color: "text-slate-600", bg: "bg-slate-100" },
  ];

  const getStatusColor = (status: string) => {
    if (status === "DELIVERED") return "bg-green-100 text-green-700 border-green-200";
    if (["IN_TRANSIT", "OUT_FOR_DELIVERY"].includes(status)) return "bg-blue-100 text-blue-700 border-blue-200";
    if (status === "PENDING") return "bg-orange-100 text-orange-700 border-orange-200";
    return "bg-slate-100 text-slate-700 border-slate-200";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Welcome back, {dbUser?.name || user?.displayName || "User"}. Here is your logistics overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center gap-4">
            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Shipments Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-900">Recent Shipments</h2>
          <Link href="/dashboard/shipments">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase font-medium text-xs">
              <tr>
                <th className="px-6 py-4">Tracking ID</th>
                <th className="px-6 py-4">Destination</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Expected Delivery</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {shipments.map((shipment) => (
                <tr key={shipment.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-mono font-medium text-slate-900">{shipment.trackingId}</td>
                  <td className="px-6 py-4 text-slate-600">{shipment.destinationHub?.city || 'Unknown'}, {shipment.destinationHub?.state || ''}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusColor(shipment.status)}`}>
                      {shipment.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {shipment.estimatedDelivery ? new Date(shipment.estimatedDelivery).toLocaleDateString('en-IN') : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Link href={`/track?id=${shipment.trackingId}`}>
                        <Button variant="outline" size="sm" className="h-8 text-xs px-2" title="Track">
                          <MapPin className="h-3.5 w-3.5 mr-1" /> Track
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {shipments.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            <Package className="h-12 w-12 mx-auto text-slate-300 mb-3" />
            <p>You have no recent shipments.</p>
            <Link href="/book">
              <Button className="mt-4">Book a Delivery</Button>
            </Link>
          </div>
        )}
      </div>

    </div>
  );
}
