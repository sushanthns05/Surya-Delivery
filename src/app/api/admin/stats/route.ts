export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const totalShipments = await prisma.shipment.count();
    
    // Today's shipments
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayShipments = await prisma.shipment.count({
      where: { createdAt: { gte: today } }
    });

    const inTransit = await prisma.shipment.count({
      where: { status: { in: ['IN_TRANSIT', 'OUT_FOR_DELIVERY'] } }
    });

    const delivered = await prisma.shipment.count({
      where: { status: 'DELIVERED' }
    });

    const pending = await prisma.shipment.count({
      where: { status: 'ORDER_PLACED' }
    });

    const cancelled = await prisma.shipment.count({
      where: { status: 'RETURN_REQUESTED' } // mapping cancelled to returned for now
    });

    const hubs = await prisma.hub.findMany({
      include: {
        _count: {
          select: { currentShipments: true, vehicles: true }
        }
      }
    });

    return NextResponse.json({
      metrics: { totalShipments, todayShipments, inTransit, delivered, pending, cancelled },
      hubs
    });
  } catch (error: any) {
    console.error('Admin Stats API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
