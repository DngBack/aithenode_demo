import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/db';
import Teacher from '@/models/Teacher';
import Student from '@/models/Student';
import { signToken } from '@/lib/jwt';

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'teacher' | 'student';
  bio?: string;
  subjects?: string[];
  languages?: string[];
  hourlyRate?: string;
  availability?: Array<{
    day: string;
    startTime: string;
    endTime: string;
  }>;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = body as RegisterRequest;
    const { name, email, password, role, bio, subjects, languages, hourlyRate, availability } = data;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

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

    // Create user with role-specific fields
    const userData = {
      name,
      email,
      password: hashedPassword,
      ...(role === 'teacher' && {
        bio,
        subjects: subjects?.filter((s: string) => s.trim() !== '') || [],
        languages: languages?.filter((l: string) => l.trim() !== '') || [],
        hourlyRate: Number(hourlyRate),
        availability,
        rating: 0,
        reviews: []
      })
    };

    const user = await (role === 'teacher' ? Teacher : Student).create(userData);

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