import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MapPin, Users, Target, Shield, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        
        {/* Hero Section */}
        <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
          <div className="container px-4 md:px-6 mx-auto relative z-10 text-center max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Moving the World, <span className="text-primary">One Package at a Time.</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Surya Delivery is India's fastest-growing tech-driven logistics network, bridging the gap between businesses and consumers with speed and reliability.
            </p>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-slate-900">Our Story</h2>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Founded in 2023, Surya Delivery started with a simple idea: logistics shouldn't be a bottleneck for growth. What began as a small fleet of 10 vans in Bengaluru has now expanded into a nationwide network covering over 5,000 pin codes.
                </p>
                <p className="text-slate-600 text-lg leading-relaxed">
                  By integrating cutting-edge AI for route optimization and maintaining a relentless focus on customer satisfaction, we have successfully delivered over 2 million packages in our first two years.
                </p>
              </div>
              <div className="bg-slate-100 rounded-3xl p-8 aspect-square md:aspect-[4/3] flex items-center justify-center border-4 border-white shadow-xl">
                <div className="text-center text-slate-400 font-medium">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-slate-300" />
                  [ Team / Network Image Placeholder ]
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-slate-50 py-20 border-y border-slate-200">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Values</h2>
              <p className="text-slate-600">These principles guide everything we do, from hiring drivers to designing our software.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Shield, title: "Reliability", desc: "If we say it will be there, it will be there." },
                { icon: Target, title: "Precision", desc: "Advanced tracking ensures zero lost packages." },
                { icon: Users, title: "Community", desc: "Empowering local delivery partners with fair wages." },
                { icon: Heart, title: "Care", desc: "Handling every package as if it were our own." },
              ].map((val, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4">
                    <val.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{val.title}</h3>
                  <p className="text-slate-500 text-sm">{val.desc}</p>
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
