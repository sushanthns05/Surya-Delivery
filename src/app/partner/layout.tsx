import Link from "next/link";
import { 
  Truck, Navigation, MapPin, 
  CheckSquare, Camera, Phone, User, LogOut 
} from "lucide-react";

export default function PartnerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 md:flex-row">
      
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 text-white shrink-0">
        <div className="flex items-center gap-2">
          <Truck className="h-6 w-6 text-primary" />
          <span className="font-bold">PARTNER APP</span>
        </div>
        <div className="flex items-center gap-2">
           <span className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-sm font-bold">DP</span>
        </div>
      </header>

      {/* Desktop Sidebar / Mobile Bottom Nav */}
      <aside className="fixed bottom-0 w-full bg-white border-t border-slate-200 md:relative md:w-64 md:border-r md:border-t-0 md:bg-slate-900 md:text-white flex flex-row md:flex-col justify-around md:justify-start z-50">
        
        <div className="hidden md:flex p-4 border-b border-slate-800 items-center gap-2 mb-4">
          <Truck className="h-6 w-6 text-primary" />
          <span className="font-bold tracking-tight">SURYA PARTNER</span>
        </div>

        <nav className="flex flex-row md:flex-col w-full px-2 py-2 md:py-0 md:gap-1">
          <SidebarLink href="/partner" icon={Navigation} label="Deliveries" active />
          <SidebarLink href="/partner/pickups" icon={MapPin} label="Pickups" />
          <SidebarLink href="/partner/history" icon={CheckSquare} label="History" />
          <SidebarLink href="/partner/profile" icon={User} label="Profile" />
          
          <Link href="/" className="hidden md:flex items-center gap-3 px-3 py-3 rounded-md text-sm font-medium transition-colors text-red-400 hover:text-red-300 hover:bg-slate-800 mt-auto mb-4">
            <LogOut className="h-5 w-5 md:h-4 md:w-4" />
            <span className="hidden md:inline">Logout</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0 p-4 md:p-6 lg:p-8 relative">
        {children}
      </main>

    </div>
  );
}

function SidebarLink({ href, icon: Icon, label, active }: any) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col md:flex-row items-center gap-1 md:gap-3 p-2 md:px-3 md:py-3 rounded-md text-xs md:text-sm font-medium transition-colors flex-1 md:flex-none justify-center md:justify-start ${
        active 
          ? 'text-primary md:bg-primary md:text-white' 
          : 'text-slate-500 hover:text-slate-900 md:text-slate-400 md:hover:text-white md:hover:bg-slate-800'
      }`}
    >
      <Icon className="h-6 w-6 md:h-4 md:w-4" />
      <span>{label}</span>
    </Link>
  );
}
