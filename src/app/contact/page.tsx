"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setError(data.error || "Failed to submit request.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)]">
        
        <div className="container px-4 md:px-6 mx-auto py-12 md:py-20">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">Contact Us</h1>
            <p className="text-lg text-slate-600">Have a question or want to partner with us? Reach out and our team will get back to you shortly.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Phone</h3>
                <p className="text-slate-600">Toll-free customer support.</p>
                <p className="font-medium text-slate-900 mt-2">1800-SURYA-DEL</p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Email</h3>
                <p className="text-slate-600">Drop us a line anytime.</p>
                <p className="font-medium text-slate-900 mt-2">support@suryadelivery.in</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Headquarters</h3>
                <p className="text-slate-600">Visit our main office.</p>
                <p className="font-medium text-slate-900 mt-2">Tech Park Phase 1, Bengaluru</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
              
              {success ? (
                <div className="bg-green-50 text-green-700 p-8 rounded-xl text-center border border-green-200 flex flex-col items-center">
                  <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. We will get back to you within 24 hours.</p>
                  <Button variant="outline" className="mt-6 bg-white" onClick={() => setSuccess(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-100">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full h-11 px-4 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full h-11 px-4 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Phone Number (Optional)</label>
                      <input 
                        type="tel" 
                        className="w-full h-11 px-4 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={e => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-700">Subject</label>
                      <select 
                        required
                        className="w-full h-11 px-4 rounded-md border border-slate-300 bg-white text-slate-900 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                        value={formData.subject}
                        onChange={e => setFormData({...formData, subject: e.target.value})}
                      >
                        <option value="" disabled>Select a subject</option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Business Partnership">Business Partnership</option>
                        <option value="Support Request">Support Request</option>
                        <option value="Feedback">Feedback</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Message</label>
                    <textarea 
                      required 
                      rows={5}
                      className="w-full p-4 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                      placeholder="How can we help you?"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <Button type="submit" className="w-full h-11 text-base font-medium" disabled={loading}>
                    {loading ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                  </Button>

                </form>
              )}
            </div>

          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
