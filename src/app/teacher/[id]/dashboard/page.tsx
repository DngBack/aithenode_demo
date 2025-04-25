'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Settings, BookOpen, Users, Calendar as CalendarIcon, Bell, CreditCard, Star } from 'lucide-react';

interface TeacherData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  subjects: string[];
  hourlyRate: number;
  rating: number;
  totalStudents: number;
  totalClasses: number;
  completedClasses: number;
  upcomingClasses: Array<{
    id: string;
    studentId: string;
    studentName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    subject: string;
  }>;
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
  }>;
  earnings: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
  availability: Array<{
    day: string;
    slots: Array<{
      start: string;
      end: string;
      available: boolean;
    }>;
  }>;
}

export default function TeacherDashboard({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [teacher, setTeacher] = useState<TeacherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

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
        {/* Profile Header */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={teacher?.avatar} />
              <AvatarFallback>{teacher?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{teacher?.name}</h2>
              <p className="text-gray-600">{teacher?.email}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className="font-medium">{teacher?.rating?.toFixed(1)}</span>
                <span className="text-gray-500">({teacher?.totalStudents} students)</span>
              </div>
              <div className="flex space-x-2 mt-2">
                {teacher?.subjects?.map((subject, index) => (
                  <Badge key={index} variant="secondary">{subject}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="schedule">Schedule</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Classes</CardTitle>
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teacher?.upcomingClasses?.length || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Next class: {teacher?.upcomingClasses?.[0]?.date || 'None scheduled'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {teacher?.totalStudents || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {teacher?.completedClasses || 0} classes completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">This Month's Earnings</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${teacher?.earnings?.thisMonth || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total: ${teacher?.earnings?.total || 0}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" variant="default">
                    Update Availability
                  </Button>
                  <Button className="w-full" variant="outline">
                    Create Group Class
                  </Button>
                  <Button className="w-full" variant="outline">
                    View Student Progress
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {teacher?.upcomingClasses?.slice(0, 3).map((classItem) => (
                    <div key={classItem.id} className="flex items-center space-x-4 py-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{classItem.subject}</p>
                        <p className="text-xs text-muted-foreground">
                          with {classItem.studentName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(classItem.date).toLocaleDateString()} at {classItem.startTime}
                        </p>
                      </div>
                      <Badge variant={classItem.status === 'scheduled' ? 'default' : 'secondary'}>
                        {classItem.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader>
                <CardTitle>Class Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacher?.upcomingClasses?.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{classItem.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          with {classItem.studentName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(classItem.date).toLocaleDateString()} at {classItem.startTime}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={classItem.status === 'scheduled' ? 'default' : 'secondary'}>
                          {classItem.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Students Tab */}
          <TabsContent value="students">
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Total Students</h3>
                      <p className="text-sm text-muted-foreground">
                        {teacher?.totalStudents || 0} active students
                      </p>
                    </div>
                    <Button variant="outline">View All Students</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Student Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Average Rating</span>
                            <span className="font-medium">{teacher?.rating?.toFixed(1)}/5.0</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Completion Rate</span>
                            <span className="font-medium">
                              {((teacher?.completedClasses || 0) / (teacher?.totalClasses || 1) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Recent Feedback</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-muted-foreground">
                          No recent feedback available.
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings">
            <Card>
              <CardHeader>
                <CardTitle>Earnings Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Total Earnings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${teacher?.earnings?.total || 0}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">This Month</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${teacher?.earnings?.thisMonth || 0}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Last Month</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ${teacher?.earnings?.lastMonth || 0}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="flex justify-end">
                    <Button variant="outline">Download Earnings Report</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Profile Information</h3>
                      <p className="text-sm text-muted-foreground">Update your personal information</p>
                    </div>
                    <Button variant="outline">Edit</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Availability Settings</h3>
                      <p className="text-sm text-muted-foreground">Manage your teaching schedule</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Payment Settings</h3>
                      <p className="text-sm text-muted-foreground">Manage your payment information</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-medium">Notification Preferences</h3>
                      <p className="text-sm text-muted-foreground">Control your notification settings</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 