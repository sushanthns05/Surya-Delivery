import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Truck, Package, Clock, ShieldCheck, ArrowRight, Zap, Globe, Plane } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const services = [
    {
      title: "Express Delivery",
      description: "Lightning fast intra-city deliveries. Perfect for urgent documents and small parcels.",
      icon: Zap,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Inter-City Freight",
      description: "Reliable transportation of large shipments across major cities using our robust truck network.",
      icon: Truck,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "E-commerce Fulfillment",
      description: "End-to-end warehousing and last-mile delivery solutions for growing online businesses.",
      icon: Package,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Cold Chain Logistics",
      description: "Temperature-controlled transit for perishables, pharmaceuticals, and sensitive goods.",
      icon: ShieldCheck,
      color: "bg-cyan-100 text-cyan-600",
    },
    {
      title: "Global Cargo",
      description: "International shipping and customs clearance via our extensive air freight partnerships.",
      icon: Plane,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Hyperlocal Network",
      description: "Connect your local stores to customers within a 10km radius for same-day delivery.",
      icon: Globe,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        
        {/* Hero Section */}
        <section className="bg-slate-50 py-20 border-b border-slate-200">
          <div className="container px-4 md:px-6 mx-auto text-center max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-6">
              Our Services
            </h1>
            <p className="text-lg text-slate-600 mb-8">
              From small envelopes to large cargo, Surya Delivery provides comprehensive logistics solutions tailored to your unique needs.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/book">
                <Button size="lg" className="rounded-xl">Book Now</Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="rounded-xl bg-white">Contact Sales</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, i) => (
                <div key={i} className="group bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-lg transition-all duration-300 hover:border-primary/30">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color}`}>
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link href="/contact" className="inline-flex items-center text-sm font-bold text-primary group-hover:text-orange-700">
                    Learn more <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
