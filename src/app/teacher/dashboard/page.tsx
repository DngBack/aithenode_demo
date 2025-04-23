'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface TeacherData {
  name: string;
  email: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
}

export default function TeacherDashboard() {
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/signin');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'teacher') {
      router.push('/signin');
      return;
    }

    // Fetch teacher data
    const fetchTeacherData = async () => {
      try {
        const response = await fetch('/api/teacher/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch teacher data');
        }

        const data = await response.json();
        setTeacher(data);
      } catch (error) {
        console.error('Error fetching teacher data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
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
          <h2 className="text-2xl font-bold mb-4">Welcome back, {teacher?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Hourly Rate</div>
              <div className="text-2xl font-bold">${teacher?.hourlyRate}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Rating</div>
              <div className="text-2xl font-bold">{teacher?.rating} / 5</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Subjects</div>
              <div className="text-lg font-medium">{teacher?.subjects?.join(', ')}</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Update Availability
              </button>
              <button className="w-full bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50">
                Create Group Class
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Upcoming Classes</h3>
            <div className="text-gray-500">
              No upcoming classes scheduled.
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
          <div className="text-gray-500">
            No recent activity to display.
          </div>
        </div>
      </div>
    </div>
  );
} 