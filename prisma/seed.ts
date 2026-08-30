import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create test user (Sender)
  const sender = await prisma.user.upsert({
    where: { email: 'sender@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'sender@example.com',
      password: 'password123', // In a real app, hash this
      phone: '9876543210',
    },
  });

  // Create Origin Hub
  const originHub = await prisma.hub.create({
    data: {
      name: 'Bengaluru Main Hub',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560001',
    },
  });

  // Create Destination Hub
  const destHub = await prisma.hub.create({
    data: {
      name: 'Mumbai Central Hub',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400001',
    },
  });

  // Create Addresses
  const pickupAddr = await prisma.address.create({
    data: {
      name: 'John Doe Home',
      mobile: '9876543210',
      address: '123 Main St',
      area: 'Koramangala',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560034',
    },
  });

  const deliveryAddr = await prisma.address.create({
    data: {
      name: 'Jane Smith Office',
      mobile: '9988776655',
      address: '456 Business Rd',
      area: 'Bandra',
      city: 'Mumbai',
      state: 'Maharashtra',
      pinCode: '400050',
    },
  });

  // Create Shipment
  const shipment = await prisma.shipment.upsert({
    where: { trackingId: 'SD2026BLR00001258' },
    update: {},
    create: {
      trackingId: 'SD2026BLR00001258',
      senderId: sender.id,
      originHubId: originHub.id,
      destinationHubId: destHub.id,
      status: 'IN_TRANSIT',
      packageCategory: 'Electronics',
      packageName: 'MacBook Pro',
      weight: 2.5,
      length: 35,
      width: 25,
      height: 5,
      quantity: 1,
      declaredValue: 150000,
      deliveryType: 'Express',
      expectedDeliveryDate: new Date(new Date().getTime() + 86400000 * 2), // 2 days from now
      pickupAddressId: pickupAddr.id,
      deliveryAddressId: deliveryAddr.id,
      trackingHistory: {
        create: [
          { status: 'ORDER_PLACED', location: 'Online', timestamp: new Date(Date.now() - 86400000) },
          { status: 'PICKED_UP', location: 'Customer Address, Bengaluru', timestamp: new Date(Date.now() - 7200000) },
          { status: 'ARRIVED_AT_ORIGIN_HUB', location: 'Bengaluru Sorting Hub', timestamp: new Date(Date.now() - 3600000) },
          { status: 'IN_TRANSIT', location: 'In transit to Mumbai Hub', timestamp: new Date() },
        ],
      },
    },
  });

  console.log('Seeded shipment:', shipment.trackingId);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
