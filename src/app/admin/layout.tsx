import Link from "next/link";
import { 
  LayoutDashboard, Package, Users, Truck, 
  MapPin, Box, Navigation, CreditCard, 
  RefreshCcw, AlertCircle, BarChart3, Bell, 
  Settings, LogOut 
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-slate-100">
      
      {/* Admin Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex-col hidden md:flex shrink-0 border-r border-slate-800">
        <div className="p-4 border-b border-slate-800 flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          <span className="font-bold text-white tracking-tight">SURYA ADMIN</span>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 scrollbar-thin">
          <nav className="flex flex-col gap-1 px-2">
            <SidebarLink href="/admin" icon={LayoutDashboard} label="Dashboard" active />
            
            <div className="mt-4 mb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Logistics</div>
            <SidebarLink href="/admin/shipments" icon={Package} label="Shipments" />
            <SidebarLink href="/admin/hubs" icon={Box} label="Hubs" />
            <SidebarLink href="/admin/warehouses" icon={Box} label="Warehouses" />
            
            <div className="mt-4 mb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Users</div>
            <SidebarLink href="/admin/customers" icon={Users} label="Customers" />
            <SidebarLink href="/admin/partners" icon={Truck} label="Delivery Partners" />
            
            <div className="mt-4 mb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Operations</div>
            <SidebarLink href="/admin/vehicles" icon={Navigation} label="Vehicles" />
            <SidebarLink href="/admin/routes" icon={MapPin} label="Routes" />
            <SidebarLink href="/admin/returns" icon={RefreshCcw} label="Returns" />
            
            <div className="mt-4 mb-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Business</div>
            <SidebarLink href="/admin/payments" icon={CreditCard} label="Payments" />
            <SidebarLink href="/admin/complaints" icon={AlertCircle} label="Complaints" />
            <SidebarLink href="/admin/reports" icon={BarChart3} label="Reports" />
          </nav>
        </div>
        
        <div className="p-4 border-t border-slate-800">
          <SidebarLink href="/admin/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/" icon={LogOut} label="Exit Admin" className="text-red-400 hover:text-red-300 hover:bg-slate-800" />
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Admin Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
          <div className="font-semibold text-slate-900">Enterprise Logistics Control</div>
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-900 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
            </button>
            <div className="h-8 w-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

    </div>
  );
}

function SidebarLink({ href, icon: Icon, label, active, className = "" }: any) {
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        active ? 'bg-primary text-white' : 'hover:bg-slate-800 hover:text-white'
      } ${className}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}
