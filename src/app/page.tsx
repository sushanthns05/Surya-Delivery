import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, PackageSearch, Box, ShieldCheck, Clock, Globe, Briefcase, RefreshCcw, Smartphone, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        
        {/* HERO SECTION */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-slate-50 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-linear-to-r from-slate-50 via-slate-50/90 to-transparent"></div>
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex flex-col justify-center space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600">
                    <Zap className="mr-2 h-4 w-4" /> Fast & Reliable Logistics
                  </div>
                  <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl xl:text-6xl text-slate-900">
                    Delivering <span className="text-primary">Everything,</span><br/> Everywhere.
                  </h1>
                  <p className="max-w-150 text-lg text-slate-600 md:text-xl">
                    Surya Delivery is India&apos;s premier logistics platform. From important documents to large appliances, we handle your shipments with speed and care.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/book">
                    <Button size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                      Book a Delivery <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/services">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto text-base h-12 px-8">
                      Our Services
                    </Button>
                  </Link>
                </div>
                
                <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-8">
                  <div>
                    <h4 className="text-3xl font-bold text-slate-900">10M+</h4>
                    <p className="text-sm text-slate-500 font-medium">Shipments Delivered</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-slate-900">5,000+</h4>
                    <p className="text-sm text-slate-500 font-medium">Cities Covered</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold text-slate-900">20k+</h4>
                    <p className="text-sm text-slate-500 font-medium">Business Customers</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-center lg:justify-end">
                {/* Tracking Card */}
                <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-orange-100 text-orange-600">
                      <PackageSearch className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">Track Shipment</h3>
                      <p className="text-sm text-slate-500">Enter your tracking ID below</p>
                    </div>
                  </div>
                  
                  <form action="/track" className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="trackingId" className="text-sm font-medium text-slate-700">Surya Tracking ID</label>
                      <input 
                        type="text" 
                        name="trackingId"
                        id="trackingId"
                        placeholder="e.g. SD2026BLR00001258" 
                        className="w-full h-12 px-4 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full h-12 text-base">
                      Track Now
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section className="w-full py-20 md:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">Comprehensive Delivery Solutions</h2>
              <p className="max-w-175 text-slate-500 md:text-lg">
                Whatever you need to send, we have a service tailored for you. Fast, secure, and reliable.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Standard Delivery", icon: Box, desc: "Reliable and cost-effective delivery across India within 3-5 business days." },
                { title: "Express Delivery", icon: Clock, desc: "Priority processing and air transit for delivery within 1-2 business days." },
                { title: "Same-Day Delivery", icon: Zap, desc: "Hyper-local delivery within hours for urgent shipments in major cities." },
                { title: "Secure Electronics", icon: Smartphone, desc: "Specialized handling with extra packaging and insurance for valuable gadgets." },
                { title: "Document Delivery", icon: ShieldCheck, desc: "Tamper-proof packaging and OTP verification for sensitive documents." },
                { title: "Business Logistics", icon: Briefcase, desc: "End-to-end supply chain solutions with dedicated account managers." },
                { title: "Bulk Shipments", icon: Globe, desc: "Freight forwarding and truckload services for large scale enterprise needs." },
                { title: "Reverse Pickup", icon: RefreshCcw, desc: "Hassle-free return management for e-commerce and retail businesses." },
              ].map((service, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-lg transition-all hover:border-orange-200">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="w-full py-20 md:py-32 bg-slate-50 border-y border-slate-200">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">How It Works</h2>
              <p className="max-w-175 text-slate-500 md:text-lg">
                Our streamlined process ensures your package gets from A to B with zero hassle.
              </p>
            </div>
            
            <div className="relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-orange-200" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: "1", title: "Book Shipment", desc: "Enter details and get an instant quote online." },
                  { step: "2", title: "Pickup", desc: "Our partner picks up the package from your door." },
                  { step: "3", title: "Transit", desc: "Package travels securely through our smart hubs." },
                  { step: "4", title: "Delivered", desc: "Safe delivery with OTP verification at destination." },
                ].map((item, i) => (
                  <div key={i} className="relative flex flex-col items-center text-center">
                    <div className="z-10 flex h-24 w-24 items-center justify-center rounded-full bg-white border-4 border-orange-100 shadow-md mb-6 text-2xl font-bold text-primary">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BUSINESS LOGISTICS CTA */}
        <section className="w-full py-20 md:py-32 bg-slate-900 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                  Power your business with Surya Delivery.
                </h2>
                <p className="text-lg text-slate-400 max-w-150">
                  Scale your e-commerce or retail business with our enterprise-grade APIs, bulk shipment tools, and dedicated account management.
                </p>
                <ul className="space-y-3">
                  {['Bulk CSV uploads', 'API integration', 'Monthly invoicing', 'Return management'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-slate-300">
                      <ShieldCheck className="h-5 w-5 text-primary" /> {feature}
                    </li>
                  ))}
                </ul>
                <div className="pt-4">
                  <Link href="/business">
                    <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 h-12 px-8">
                      Create Business Account
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl">
                {/* Mockup or Image for business */}
                <div className="absolute inset-0 bg-slate-800 flex items-center justify-center">
                   <div className="text-center p-8">
                      <div className="inline-block p-4 rounded-full bg-slate-700/50 mb-4">
                        <Globe className="h-12 w-12 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">B2B Dashboard</h3>
                      <p className="text-slate-400">Advanced analytics and tracking for high-volume shippers.</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
