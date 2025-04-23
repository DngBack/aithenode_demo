'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface StudentData {
  name: string;
  email: string;
  interests: string[];
  bookedClasses: Array<{
    teacherId: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
  }>;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/signin');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'student') {
      router.push('/signin');
      return;
    }

    // Fetch student data
    const fetchStudentData = async () => {
      try {
        const response = await fetch('/api/student/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }

        const data = await response.json();
        setStudent(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Profile Overview */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Welcome back, {student?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Your Interests</div>
              <div className="text-lg font-medium">{student?.interests?.join(', ') || 'No interests set'}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Upcoming Classes</div>
              <div className="text-2xl font-bold">{student?.bookedClasses?.filter(c => c.status === 'scheduled').length || 0}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Find Teachers
              </button>
              <button className="w-full bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50">
                Browse Group Classes
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Next Class</h3>
            {student?.bookedClasses?.find(c => c.status === 'scheduled') ? (
              <div>
                <p className="text-gray-600">Your next class is scheduled for:</p>
                <p className="font-medium mt-2">
                  {new Date(student.bookedClasses[0].date).toLocaleDateString()} at{' '}
                  {student.bookedClasses[0].startTime}
                </p>
              </div>
            ) : (
              <div className="text-gray-500">
                No upcoming classes scheduled.
              </div>
            )}
          </div>
        </div>

        {/* Learning Progress */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Learning Progress</h3>
          <div className="text-gray-500">
            Start booking classes to track your learning progress!
          </div>
        </div>
      </div>
    </div>
  );
} 