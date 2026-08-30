import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const contactRequest = await prisma.contactRequest.create({
      data: {
        name,
        email,
        phone: phone || null,
        subject,
        message,
        status: "UNREAD"
      }
    });

    return NextResponse.json({ success: true, request: contactRequest });
  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
