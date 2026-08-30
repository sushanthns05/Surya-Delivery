import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { pickup, delivery, pkg, service, paymentMethod, userEmail } = body;

    // 1. Find user if logged in, else use a guest generic user
    let user = null;
    if (userEmail) {
      user = await prisma.user.findUnique({ where: { email: userEmail } });
    }
    
    if (!user) {
      // Fallback to finding or creating a GUEST user
      user = await prisma.user.upsert({
        where: { email: 'guest@suryadelivery.in' },
        update: {},
        create: {
          name: 'Guest User',
          email: 'guest@suryadelivery.in',
          password: 'mock_password',
        }
      });
    }

    // 2. Resolve Hubs (mock logic for demo: grab first available hubs)
    const hubs = await prisma.hub.findMany({ take: 2 });
    let originHubId = hubs.length > 0 ? hubs[0].id : null;
    let destinationHubId = hubs.length > 1 ? hubs[1].id : (hubs.length > 0 ? hubs[0].id : null);
    
    // Create hubs if they don't exist
    if (!originHubId) {
      const newHub = await prisma.hub.create({ 
        data: { name: 'Central Hub', city: 'Bengaluru', state: 'Karnataka', pinCode: '560001' } 
      });
      originHubId = newHub.id;
      destinationHubId = newHub.id;
    }

    // 3. Generate Tracking ID
    const trackingId = `SD${new Date().getFullYear()}BLR${Math.floor(100000 + Math.random() * 900000)}`;

    // 4. Create Sender and Receiver Addresses
    const pickupAddress = await prisma.address.create({
      data: {
        name: pickup.name,
        mobile: pickup.phone,
        address: pickup.address,
        area: 'Unknown',
        city: 'Pickup City',
        state: 'State',
        pinCode: pickup.pin,
      }
    });

    const deliveryAddress = await prisma.address.create({
      data: {
        name: delivery.name,
        mobile: delivery.phone,
        address: delivery.address,
        area: 'Unknown',
        city: 'Delivery City', 
        state: 'State',
        pinCode: delivery.pin,
      }
    });

    // 5. Create Shipment
    const shipment = await prisma.shipment.create({
      data: {
        trackingId,
        senderId: user.id,
        pickupAddressId: pickupAddress.id,
        deliveryAddressId: deliveryAddress.id,
        originHubId: originHubId!,
        destinationHubId: destinationHubId!,
        currentHubId: originHubId!,
        status: 'ORDER_PLACED',
        
        // Package Details
        packageCategory: pkg.category,
        packageName: 'Standard Package',
        weight: parseFloat(pkg.weight) || 1,
        length: 10,
        width: 10,
        height: 10,
        quantity: 1,
        declaredValue: 500,
        
        // Delivery Details
        deliveryType: service.type || 'Standard',
        expectedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      }
    });

    // 6. Create Initial Tracking History
    await prisma.trackingHistory.create({
      data: {
        shipmentId: shipment.id,
        status: 'ORDER_PLACED',
        location: 'Booking Created',
      }
    });

    // 7. Create Payment record
    await prisma.payment.create({
      data: {
        shipmentId: shipment.id,
        amount: service.totalPrice || 0,
        tax: (service.totalPrice || 0) * 0.18, // 18% GST mock
        method: paymentMethod || 'ONLINE',
        status: paymentMethod === 'COD' ? 'PENDING' : 'SUCCESS', 
      }
    });

    return NextResponse.json({ success: true, trackingId });

  } catch (error: unknown) {
    console.error('Shipment Booking Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
