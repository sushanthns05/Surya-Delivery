export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const pending = await prisma.shipment.findMany({
      where: { status: 'OUT_FOR_DELIVERY' },
      include: {
        deliveryAddress: true,
      },
      orderBy: { updatedAt: 'desc' }
    });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const completed = await prisma.shipment.findMany({
      where: { 
        status: 'DELIVERED',
        updatedAt: { gte: today }
      },
      include: {
        deliveryAddress: true,
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({ pending, completed });
  } catch (error: any) {
    console.error('Partner API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
