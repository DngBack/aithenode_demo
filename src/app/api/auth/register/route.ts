import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import Teacher from '@/models/Teacher';
import Student from '@/models/Student';
import { signToken } from '@/lib/jwt';

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    await connectDB();

    // Check if user already exists
    const existingUser = await (role === 'teacher' ? Teacher : Student).findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await (role === 'teacher' ? Teacher : Student).create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate token
    const token = signToken({ id: user._id, role });

    return NextResponse.json(
      { token, user: { id: user._id, name: user.name, email: user.email, role } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 