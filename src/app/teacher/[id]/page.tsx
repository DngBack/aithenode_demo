'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface TeacherData {
  name: string;
  email: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  scheduledClasses: Array<{
    studentId: string;
    studentName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
  }>;
  totalEarnings: number;
  totalClasses: number;
}

export default function TeacherProfilePage({ params }: { params: { id: string } }) {
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
    if (userData.role !== 'teacher' || userData.id !== params.id) {
      router.push('/signin');
      return;
    }

    // Fetch teacher data
    const fetchTeacherData = async () => {
      try {
        const response = await fetch(`/api/teacher/${params.id}`, {
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
  }, [router, params.id]);

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
          <h2 className="text-2xl font-bold mb-4">Chào mừng trở lại, {teacher?.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Môn dạy</div>
              <div className="text-lg font-medium">{teacher?.subjects?.join(', ') || 'Chưa cập nhật'}</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Học phí/giờ</div>
              <div className="text-2xl font-bold">{teacher?.hourlyRate?.toLocaleString('vi-VN')}đ</div>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-sm text-gray-500">Đánh giá</div>
              <div className="text-2xl font-bold flex items-center">
                {teacher?.rating || 0}
                <span className="text-yellow-400 ml-1">★</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions and Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Thao tác nhanh</h3>
            <div className="space-y-4">
              <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                Cập nhật lịch dạy
              </button>
              <button className="w-full bg-white text-indigo-600 border border-indigo-600 px-4 py-2 rounded-md hover:bg-indigo-50">
                Tạo lớp học nhóm
              </button>
            </div>
          </div>

          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4">Thống kê</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tổng số lớp đã dạy</span>
                <span className="font-bold">{teacher?.totalClasses || 0}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tổng thu nhập</span>
                <span className="font-bold text-green-600">{teacher?.totalEarnings?.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium mb-4">Lớp học sắp tới</h3>
          {teacher?.scheduledClasses?.length ? (
            <div className="space-y-4">
              {teacher.scheduledClasses.map((class_, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-4 last:border-b-0 last:pb-0">
                  <div>
                    <p className="font-medium">{class_.studentName}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(class_.date).toLocaleDateString('vi-VN')} - {class_.startTime} đến {class_.endTime}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
                      Vào lớp
                    </button>
                    <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">
                      Chi tiết
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-500">
              Không có lớp học nào được lên lịch.
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 