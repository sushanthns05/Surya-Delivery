import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { PackageSearch, MapPin, CheckCircle2, Clock, Truck, Home } from "lucide-react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function TrackPage({
  searchParams,
}: {
  searchParams: { id?: string; trackingId?: string };
}) {
  const trackingId = searchParams.id || searchParams.trackingId || "";
  
  let shipment = null;
  let error = null;
  
  if (trackingId) {
    try {
      shipment = await prisma.shipment.findUnique({
        where: { trackingId },
        include: {
          trackingHistory: {
            orderBy: { timestamp: 'desc' }
          },
          originHub: true,
          destinationHub: true,
        }
      });
    } catch (e) {
      console.error(e);
      error = "Failed to fetch tracking data. Please try again later.";
    }
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 min-h-[calc(100vh-4rem)] py-12">
        <div className="container px-4 md:px-6 mx-auto max-w-4xl">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-3 bg-orange-100 text-orange-600 rounded-full mb-4">
              <PackageSearch className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Track Your Shipment</h1>
            <p className="text-slate-500 mt-2">Enter your Surya Tracking ID to get real-time updates.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-2 max-w-2xl mx-auto mb-12">
            <form action="/track" className="flex flex-col sm:flex-row gap-2">
              <input 
                type="text" 
                name="id"
                defaultValue={trackingId || ""}
                placeholder="Enter Tracking ID (e.g. SD2026BLR00001258)" 
                className="flex-1 min-w-50 h-12 px-4 rounded-md border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                required
              />
              <Button type="submit" className="h-12 px-8 rounded-xl">
                Track Shipment
              </Button>
            </form>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100 mb-8 max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {trackingId && !shipment && !error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-100 max-w-2xl mx-auto">
              No shipment found with tracking ID: <strong>{trackingId}</strong>. Please check and try again.
            </div>
          )}

          {shipment && (
            <div className="grid md:grid-cols-3 gap-8">
              
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
                  <div className="flex flex-wrap justify-between items-start gap-4 border-b border-slate-100 pb-6 mb-6">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Tracking ID</p>
                      <h2 className="text-2xl font-bold text-slate-900">{shipment.trackingId}</h2>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-slate-500">Current Status</p>
                      <div className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600 mt-1">
                        {shipment.status.replace(/_/g, ' ')}
                      </div>
                    </div>
                  </div>

                  <div className="relative pl-8 space-y-8">
                    {/* Timeline Line */}
                    <div className="absolute left-3.75 top-2 bottom-2 w-0.5 bg-slate-200"></div>
                    
                    {shipment.trackingHistory.length === 0 ? (
                      <p className="text-slate-500">No tracking history available yet.</p>
                    ) : (
                      shipment.trackingHistory.map((history: any, index: number) => {
                        const isLatest = index === 0;
                        return (
                          <div key={history.id} className="relative">
                            <div className={`absolute -left-8.75 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white ${isLatest ? 'bg-primary' : 'bg-slate-300'}`}>
                              {isLatest ? <Truck className="h-3 w-3 text-white" /> : <CheckCircle2 className="h-4 w-4 text-white" />}
                            </div>
                            <div>
                              <h4 className={`text-lg font-bold ${isLatest ? 'text-primary' : 'text-slate-700'}`}>
                                {history.status.replace(/_/g, ' ')}
                              </h4>
                              <p className="text-slate-600 mt-1">{history.location}</p>
                              {history.description && <p className="text-sm text-slate-500 mt-1">{history.description}</p>}
                              <p className="text-sm text-slate-400 mt-1 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> 
                                {new Date(history.timestamp).toLocaleString('en-IN', {
                                  dateStyle: 'medium', timeStyle: 'short'
                                })}
                              </p>
                            </div>
                          </div>
                        )
                      })
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="font-bold text-slate-900 mb-4">Shipment Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Origin</p>
                        <p className="text-sm text-slate-900">{shipment.originHub?.city || 'Unknown'}, {shipment.originHub?.state || ''}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Home className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Destination</p>
                        <p className="text-sm text-slate-900">{shipment.destinationHub?.city || 'Unknown'}, {shipment.destinationHub?.state || ''}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Expected Delivery</p>
                        <p className="text-sm text-slate-900 font-medium">
                          {shipment.expectedDeliveryDate ? new Date(shipment.expectedDeliveryDate).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' }) : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <hr className="my-6 border-slate-100" />
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Package</span>
                      <span className="font-medium text-slate-900">{shipment.packageCategory || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Weight</span>
                      <span className="font-medium text-slate-900">{shipment.weight} kg</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
