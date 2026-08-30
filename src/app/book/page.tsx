"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ChevronRight, Package, MapPin, Truck, CreditCard } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const steps = [
  { id: 1, name: "Pickup", icon: MapPin },
  { id: 2, name: "Delivery", icon: MapPin },
  { id: 3, name: "Package", icon: Package },
  { id: 4, name: "Service", icon: Truck },
  { id: 5, name: "Payment", icon: CreditCard },
];

export default function BookDeliveryPage() {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    pickup: { name: "", phone: "", address: "", pin: "" },
    delivery: { name: "", phone: "", address: "", pin: "" },
    package: { category: "Electronics", weight: "1", name: "" },
    service: { type: "Standard", price: 150 },
    paymentMethod: "COD"
  });

  // Dynamic Pricing Logic
  const [distance, setDistance] = useState(10); // Default mock distance
  
  useEffect(() => {
    // Generate a mock distance between 5 and 500 based on PINs
    if (formData.pickup.pin && formData.delivery.pin) {
      const p1 = parseInt(formData.pickup.pin.substring(0, 2)) || 0;
      const p2 = parseInt(formData.delivery.pin.substring(0, 2)) || 0;
      const calcDist = Math.max(5, Math.abs(p1 - p2) * 50); // Rough mock distance
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDistance(calcDist);
    }
  }, [formData.pickup.pin, formData.delivery.pin]);

  const basePrice = 50;
  const weight = parseFloat(formData.package.weight) || 0;
  const calculatedPrice = basePrice + (weight * 50) + (distance * 8);

  const services = [
    { name: "Standard", desc: "Delivery in 3-5 days", price: Math.round(calculatedPrice) },
    { name: "Express", desc: "Delivery in 1-2 days", price: Math.round(calculatedPrice * 1.5) },
    { name: "Same Day", desc: "Delivery by tonight", price: Math.round(calculatedPrice * 2.5) },
  ];

  const handleServiceChange = (svcName: string, svcPrice: number) => {
    setFormData(prev => ({...prev, service: { type: svcName, price: svcPrice }}));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 5) {
      nextStep();
      return;
    }
    
    // Final submit
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/shipments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pickup: formData.pickup,
          delivery: formData.delivery,
          pkg: formData.package,
          service: { ...formData.service, totalPrice: Math.round(formData.service.price * 1.18) },
          paymentMethod: formData.paymentMethod,
          userEmail: user?.email || null,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create booking");

      setTrackingId(data.trackingId);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (section: keyof Omit<typeof formData, 'paymentMethod'>, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as any), [field]: value }
    }));
  };

  if (isSubmitted) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 max-w-md w-full text-center">
            <div className="inline-flex items-center justify-center p-3 bg-green-100 text-green-600 rounded-full mb-6">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Booking Confirmed!</h2>
            <p className="text-slate-500 mb-6">Your shipment has been booked successfully. Our delivery partner will pick it up soon.</p>
            
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8">
              <p className="text-sm text-slate-500 mb-1">Tracking ID</p>
              <p className="text-xl font-mono font-bold text-slate-900">{trackingId}</p>
            </div>

            <div className="flex flex-col gap-3">
              <Link href={`/track?id=${trackingId}`}>
                <Button className="w-full h-12">Track Shipment</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full h-12">Go to Dashboard</Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] py-12">
        <div className="container px-4 md:px-6 mx-auto max-w-3xl">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Book a Delivery</h1>
            <p className="text-slate-500 mt-2">Fill in the details to schedule your shipment.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Stepper */}
          <div className="mb-10 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2 z-0 hidden sm:block"></div>
            <div className="relative z-10 flex justify-between">
              {steps.map((step) => (
                <div key={step.id} className="flex flex-col items-center gap-2">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                    currentStep === step.id ? 'border-primary bg-primary text-white' : 
                    currentStep > step.id ? 'border-primary bg-primary text-white' : 'border-slate-300 bg-white text-slate-400'
                  } transition-colors`}>
                    {currentStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : <step.icon className="h-4 w-4" />}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${currentStep >= step.id ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
            <form onSubmit={handleSubmit}>
              
              {currentStep === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Pickup Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Sender Name</label>
                      <input required type="text" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.pickup.name} onChange={(e) => handleInputChange('pickup', 'name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Mobile Number</label>
                      <input required type="tel" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.pickup.phone} onChange={(e) => handleInputChange('pickup', 'phone', e.target.value)} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-900">Full Address</label>
                      <input required type="text" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.pickup.address} onChange={(e) => handleInputChange('pickup', 'address', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">PIN Code</label>
                      <input required type="text" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.pickup.pin} onChange={(e) => handleInputChange('pickup', 'pin', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Delivery Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Receiver Name</label>
                      <input required type="text" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.delivery.name} onChange={(e) => handleInputChange('delivery', 'name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Mobile Number</label>
                      <input required type="tel" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.delivery.phone} onChange={(e) => handleInputChange('delivery', 'phone', e.target.value)} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-medium text-slate-900">Full Address</label>
                      <input required type="text" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.delivery.address} onChange={(e) => handleInputChange('delivery', 'address', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">PIN Code</label>
                      <input required type="text" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.delivery.pin} onChange={(e) => handleInputChange('delivery', 'pin', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Package Details</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Package Category</label>
                      <select className="w-full h-10 px-3 rounded-md border border-slate-300 text-slate-900 focus:border-primary outline-none bg-white" value={formData.package.category} onChange={(e) => handleInputChange('package', 'category', e.target.value)}>
                        <option>Electronics</option>
                        <option>Documents</option>
                        <option>Clothing</option>
                        <option>Home Appliances</option>
                        <option>Retail Products</option>
                        <option>Gifts</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Package Description</label>
                      <input required type="text" placeholder="e.g. Dell Laptop" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.package.name} onChange={(e) => handleInputChange('package', 'name', e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Approximate Weight (kg)</label>
                      <input required type="number" min="0.1" step="0.1" className="w-full h-10 px-3 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary outline-none" value={formData.package.weight} onChange={(e) => handleInputChange('package', 'weight', e.target.value)} />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Delivery Service</h3>
                  <p className="text-sm text-slate-500 mb-4">Calculated based on {distance}km distance and {weight}kg weight.</p>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {services.map((svc) => (
                      <label key={svc.name} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-colors ${formData.service.type === svc.name ? 'border-primary bg-orange-50' : 'border-slate-200 hover:border-slate-300 bg-white'}`}>
                        <div className="flex items-center gap-3">
                          <input 
                            type="radio" 
                            name="service" 
                            value={svc.name} 
                            checked={formData.service.type === svc.name}
                            onChange={() => handleServiceChange(svc.name, svc.price)}
                            className="text-primary focus:ring-primary h-4 w-4"
                          />
                          <div>
                            <p className="font-bold text-slate-900">{svc.name}</p>
                            <p className="text-sm text-slate-500">{svc.desc}</p>
                          </div>
                        </div>
                        <span className="font-bold text-slate-900">₹{svc.price}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Payment</h3>
                  
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Service: {formData.service.type}</span>
                      <span className="font-medium text-slate-900">₹{formData.service.price}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-500">Taxes (18% GST)</span>
                      <span className="font-medium text-slate-900">₹{Math.round(formData.service.price * 0.18)}</span>
                    </div>
                    <hr className="border-slate-200 my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-slate-900">Total Amount</span>
                      <span className="text-primary">₹{Math.round(formData.service.price * 1.18)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className={`h-12 justify-start px-4 ${formData.paymentMethod === 'UPI' ? 'border-primary bg-orange-50 text-orange-700' : 'bg-white text-slate-700'}`}
                      onClick={() => setFormData(prev => ({...prev, paymentMethod: 'UPI'}))}
                    >
                      UPI (GPay)
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className={`h-12 justify-start px-4 ${formData.paymentMethod === 'CARD' ? 'border-primary bg-orange-50 text-orange-700' : 'bg-white text-slate-700'}`}
                      onClick={() => setFormData(prev => ({...prev, paymentMethod: 'CARD'}))}
                    >
                      Card
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className={`h-12 justify-start px-4 ${formData.paymentMethod === 'NETBANK' ? 'border-primary bg-orange-50 text-orange-700' : 'bg-white text-slate-700'}`}
                      onClick={() => setFormData(prev => ({...prev, paymentMethod: 'NETBANK'}))}
                    >
                      Net Banking
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className={`h-12 justify-start px-4 ${formData.paymentMethod === 'COD' ? 'border-primary bg-orange-50 text-orange-700' : 'bg-white text-slate-700'}`}
                      onClick={() => setFormData(prev => ({...prev, paymentMethod: 'COD'}))}
                    >
                      Pay on Delivery
                    </Button>
                  </div>
                  <p className="text-xs text-slate-500 text-center">In this demo, selecting Pay on Delivery will confirm the booking directly without payment gateway.</p>
                </div>
              )}

              <div className="flex justify-between mt-8 pt-6 border-t border-slate-100">
                <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1 || isLoading}>
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Processing..." : currentStep === 5 ? "Confirm Booking" : "Next Step"} 
                  {!isLoading && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>

            </form>
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
