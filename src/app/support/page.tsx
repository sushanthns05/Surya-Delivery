import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Search, HelpCircle, FileText, Phone, MessageSquare } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  const faqs = [
    {
      q: "How can I track my shipment?",
      a: "You can track your shipment by entering the Tracking ID provided in your booking confirmation on our Tracking page.",
    },
    {
      q: "What are your delivery hours?",
      a: "We deliver between 8:00 AM and 8:00 PM, Monday through Saturday. Express deliveries may occur outside these hours depending on the route.",
    },
    {
      q: "How do I calculate the shipping cost?",
      a: "Our pricing is dynamic based on base price, weight, and distance. You can use our interactive booking form to get an instant quote before confirming your order.",
    },
    {
      q: "What items are prohibited from shipping?",
      a: "We do not transport hazardous materials, illegal substances, perishable goods (without prior cold-chain arrangement), or extremely fragile items without proper packaging.",
    },
    {
      q: "How can I cancel a pickup?",
      a: "You can cancel a scheduled pickup from your Dashboard at least 2 hours before the pickup time for a full refund.",
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)]">
        
        {/* Support Header */}
        <section className="bg-primary py-16 md:py-24 text-primary-foreground">
          <div className="container px-4 md:px-6 mx-auto text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">How can we help?</h1>
            
            <div className="relative max-w-2xl mx-auto mt-8">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search for articles, tracking info, or FAQs..." 
                className="w-full h-14 pl-12 pr-4 rounded-xl text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-primary/20 shadow-lg"
              />
              <Button className="absolute inset-y-1.5 right-1.5 h-11 px-6 rounded-lg bg-slate-900 hover:bg-slate-800 text-white">
                Search
              </Button>
            </div>
          </div>
        </section>

        {/* Support Categories */}
        <section className="py-12 -mt-8">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              
              <Link href="/track" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-primary/50 transition-colors flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <HelpCircle className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Tracking Issues</h3>
                <p className="text-slate-500 text-sm">Where is my package? Status meanings.</p>
              </Link>
              
              <Link href="/book" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-primary/50 transition-colors flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <FileText className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Billing & Pricing</h3>
                <p className="text-slate-500 text-sm">Invoices, payment failures, refunds.</p>
              </Link>

              <Link href="/contact" className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-primary/50 transition-colors flex flex-col items-center text-center group">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="h-7 w-7" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Live Support</h3>
                <p className="text-slate-500 text-sm">Chat with our support agents.</p>
              </Link>

            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="container px-4 md:px-6 mx-auto max-w-3xl">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
                  <h3 className="font-bold text-slate-900 text-lg mb-2 flex items-start gap-3">
                    <span className="text-primary mt-0.5">Q.</span> {faq.q}
                  </h3>
                  <p className="text-slate-600 pl-7 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
              <Phone className="h-10 w-10 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Still need help?</h3>
              <p className="text-slate-500 mb-6">Our customer care team is available 24/7 to assist you.</p>
              <Link href="/contact">
                <Button>Contact Support</Button>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
