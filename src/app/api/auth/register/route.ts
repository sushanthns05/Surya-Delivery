import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, name, phone, isOAuth } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (isOAuth) {
        // If logging in via OAuth, it's fine if the user already exists.
        return NextResponse.json({ success: true, user: { id: existingUser.id, email: existingUser.email, name: existingUser.name, role: existingUser.role } });
      }
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Create new user in PostgreSQL
    // Password is handled by Firebase, so we store a dummy value
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phone,
        password: 'FIREBASE_AUTH', // Not used since Firebase handles auth
        role: 'CUSTOMER',
      },
    });

    return NextResponse.json({ success: true, user: { id: user.id, email: user.email, name: user.name, role: user.role } });
  } catch (error: any) {
    console.error('Registration API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
