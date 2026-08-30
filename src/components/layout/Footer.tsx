import Link from "next/link";
import { Truck, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 text-white">
              <Truck className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">SURYA DELIVERY</span>
            </Link>
            <p className="text-sm text-slate-400">
              “Delivering Everything, Everywhere.” Modern logistics and supply chain solutions for everyone.
            </p>
            <div className="flex flex-col gap-2 text-sm mt-4">
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/> 123 Logistics Park, Bengaluru</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4"/> +91 800 555 0199</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4"/> support@suryadelivery.com</div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-primary transition-colors">Standard Delivery</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Express Delivery</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Same Day Delivery</Link></li>
              <li><Link href="/business" className="hover:text-primary transition-colors">Business Logistics</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Support & Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/support" className="hover:text-primary transition-colors">Help Center</Link></li>
              <li><Link href="/track" className="hover:text-primary transition-colors">Track Shipment</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Raise Complaint</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link href="/" className="hover:text-primary transition-colors">Shipping Policy</Link></li>
            </ul>
          </div>
          
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-sm text-center text-slate-500">
          <p>&copy; {new Date().getFullYear()} Surya Delivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
