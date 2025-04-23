import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import connectDB from '@/lib/db';
import Student from '@/models/Student';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const headersList = headers();
    const userId = headersList.get('x-user-id');
    const userRole = headersList.get('x-user-role');

    if (!userId || userRole !== 'student') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Only allow students to access their own profile
    if (userId !== params.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    await connectDB();

    const student = await Student.findById(params.id).select('-password');
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(student);
  } catch (error) {
    console.error('Error fetching student profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 