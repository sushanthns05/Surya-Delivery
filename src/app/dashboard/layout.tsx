import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import Link from "next/link";
import { LayoutDashboard, Package, MapPin, CreditCard, FileText, HelpCircle, User, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <div className="flex-1 container mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
            <div className="p-4 bg-slate-900 text-white">
              <h2 className="font-bold">My Account</h2>
              <p className="text-xs text-slate-400">Customer</p>
            </div>
            <nav className="flex flex-col p-2">
              <SidebarLink href="/dashboard" icon={LayoutDashboard} label="Dashboard" active />
              <SidebarLink href="/book" icon={Package} label="Book Delivery" />
              <SidebarLink href="/dashboard/shipments" icon={Package} label="My Shipments" />
              <SidebarLink href="/track" icon={MapPin} label="Track Shipment" />
              <SidebarLink href="/dashboard/addresses" icon={MapPin} label="Addresses" />
              <SidebarLink href="/dashboard/payments" icon={CreditCard} label="Payments" />
              <SidebarLink href="/dashboard/invoices" icon={FileText} label="Invoices" />
              <SidebarLink href="/dashboard/support" icon={HelpCircle} label="Support" />
              <hr className="my-2 border-slate-100" />
              <SidebarLink href="/dashboard/profile" icon={User} label="Profile" />
              <SidebarLink href="/" icon={LogOut} label="Logout" className="text-red-600 hover:bg-red-50 hover:text-red-700" />
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}

function SidebarLink({ href, icon: Icon, label, active, className = "" }: any) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        active ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-100'
      } ${className}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
