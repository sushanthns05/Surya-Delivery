import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Building2, TrendingUp, BarChart3, Users2, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BusinessPage() {
  const benefits = [
    {
      title: "API Integration",
      description: "Seamlessly integrate our logistics engine into your e-commerce platform for automated booking and tracking.",
      icon: Zap,
    },
    {
      title: "Volume Discounts",
      description: "Enjoy scaled pricing based on your monthly shipping volume. The more you ship, the more you save.",
      icon: TrendingUp,
    },
    {
      title: "Dedicated Account Manager",
      description: "Get personalized support with a dedicated logistics expert handling your business operations.",
      icon: Users2,
    },
    {
      title: "Advanced Analytics",
      description: "Access detailed reports on delivery success rates, transit times, and logistics costs in your dashboard.",
      icon: BarChart3,
    },
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-20 md:py-32 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 opacity-10 pointer-events-none">
            <Building2 className="w-96 h-96" />
          </div>
          <div className="container px-4 md:px-6 mx-auto relative z-10 max-w-4xl">
            <div className="inline-flex items-center rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm font-medium text-orange-400 mb-6">
              Surya Enterprise
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Scale your business with <span className="text-primary">smart logistics.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl leading-relaxed mb-10">
              Reliable supply chain solutions for B2B and B2C enterprises. Focus on your product, let us handle the delivery.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="rounded-xl h-14 px-8 text-base">Talk to Sales</Button>
              </Link>
              <Link href="/book">
                <Button variant="outline" size="lg" className="rounded-xl h-14 px-8 text-base bg-transparent border-slate-700 hover:bg-slate-800 text-white">View Pricing</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Enterprise Benefits */}
        <section className="py-24 bg-slate-50 border-b border-slate-200">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why choose Surya for Business?</h2>
              <p className="text-lg text-slate-600">We offer end-to-end supply chain visibility and control tailored for high-volume shippers.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex gap-6">
                  <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center shrink-0">
                    <benefit.icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <div className="container px-4 md:px-6 mx-auto max-w-2xl">
            <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to optimize your deliveries?</h2>
            <p className="text-lg text-slate-600 mb-8">Join hundreds of businesses that trust Surya Delivery for their logistics needs.</p>
            <Link href="/contact">
              <Button size="lg" className="rounded-xl h-14 px-10 text-base">Partner With Us</Button>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
