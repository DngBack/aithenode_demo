"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Settings, BookOpen, Users, Calendar as CalendarIcon, Bell, CreditCard } from 'lucide-react';
import { toast } from 'sonner';

interface StudentData {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  interests: string[];
  bookedClasses: Array<{
    id: string;
    teacherId: string;
    teacherName: string;
    date: string;
    startTime: string;
    endTime: string;
    status: string;
    subject: string;
  }>;
  progress: {
    completedClasses: number;
    totalClasses: number;
    averageRating: number;
  };
  notifications: Array<{
    id: string;
    title: string;
    message: string;
    date: string;
    read: boolean;
  }>;
  paymentHistory: Array<{
    id: string;
    amount: number;
    date: string;
    status: string;
    description: string;
  }>;
  educationLevel?: string;
  preferredLearningStyle?: string[];
  settings?: any;
  timezone?: string;
  language?: string;
}

interface DashboardPageProps {
  params: {
    id: string
  }
}

export default function StudentDashboardPage({ params }: DashboardPageProps) {
  const router = useRouter();
  const [student, setStudent] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.push('/signin');
      return;
    }

    const userData = JSON.parse(user);
    if (userData.role !== 'student' || userData.id !== params.id) {
      router.push('/signin');
      return;
    }

    // Fetch student data
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`/api/student/${params.id}`, {
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
  }, [router, params.id]);

  const handleSettingsChange = async (updates: Partial<StudentData>) => {
    try {
      setSaving(true);
      const token = localStorage.getItem('token');

      const response = await fetch(`/api/student/${params.id}/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      const updatedStudent = await response.json();
      setStudent(updatedStudent);
      toast.success('Settings updated successfully');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-xl shadow p-6 mb-10 border border-gray-100">
        <Avatar className="h-24 w-24">
          <AvatarImage src={student?.avatar} />
          <AvatarFallback>{student?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-1">{student?.name}</h1>
          <p className="text-gray-600 mb-2">{student?.email}</p>
          <div className="flex flex-wrap gap-2">
            {student?.interests?.map((interest, idx) => (
              <Badge key={idx} variant="secondary">{interest}</Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main Actions */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-10">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Find Teachers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">
              Browse and connect with qualified teachers for your subjects.
            </p>
            <Button 
              onClick={() => router.push(`/student/${params.id}/find-teacher`)}
              className="w-full"
            >
              Find Teachers
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              My Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">
              View and manage your upcoming and past tutoring sessions.
            </p>
            <Button 
              onClick={() => router.push(`/student/${params.id}/sessions`)}
              className="w-full"
            >
              View Sessions
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              My Courses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4 text-sm text-gray-600">
              Access your enrolled courses and learning materials.
            </p>
            <Button 
              onClick={() => router.push(`/student/${params.id}/courses`)}
              className="w-full"
            >
              View Courses
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 mb-10" />

      {/* Tabs Section (unchanged, but now visually separated) */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
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
                    {student?.bookedClasses?.filter(c => c.status === 'scheduled').length || 0}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Next class: {student?.bookedClasses?.find(c => c.status === 'scheduled')?.date || 'None scheduled'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {student?.progress?.completedClasses || 0} / {student?.progress?.totalClasses || 0}
                  </div>
                  <Progress value={(student?.progress?.completedClasses || 0) / (student?.progress?.totalClasses || 1) * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {student?.progress?.averageRating?.toFixed(1) || '0.0'} / 5.0
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {student?.progress?.completedClasses || 0} classes
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
                    Find Teachers
                  </Button>
                  <Button className="w-full" variant="outline">
                    Browse Group Classes
                  </Button>
                  <Button className="w-full" variant="outline">
                    View Learning Materials
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  {student?.bookedClasses?.slice(0, 3).map((classItem) => (
                    <div key={classItem.id} className="flex items-center space-x-4 py-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{classItem.subject}</p>
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

          {/* Classes Tab */}
          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <CardTitle>Your Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student?.bookedClasses?.map((classItem) => (
                    <div key={classItem.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-medium">{classItem.subject}</h3>
                        <p className="text-sm text-muted-foreground">
                          with {classItem.teacherName}
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

          {/* Progress Tab */}
          <TabsContent value="progress">
            <Card>
              <CardHeader>
                <CardTitle>Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Overall Progress</h3>
                      <p className="text-sm text-muted-foreground">
                        {student?.progress?.completedClasses || 0} of {student?.progress?.totalClasses || 0} classes completed
                      </p>
                    </div>
                    <Progress 
                      value={(student?.progress?.completedClasses || 0) / (student?.progress?.totalClasses || 1) * 100} 
                      className="w-1/3" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Subject Progress</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {student?.interests?.map((subject, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-sm">{subject}</span>
                              <Progress value={Math.random() * 100} className="w-1/2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm">Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Average Rating</span>
                            <span className="font-medium">{student?.progress?.averageRating?.toFixed(1) || '0.0'}/5.0</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Attendance Rate</span>
                            <span className="font-medium">95%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {student?.notifications?.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start space-x-4 p-4 border rounded-lg ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}
                    >
                      <Bell className="h-5 w-5 text-blue-500" />
                      <div className="flex-1">
                        <h3 className="font-medium">{notification.title}</h3>
                        <p className="text-sm text-muted-foreground">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(notification.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
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
                <div className="space-y-6">
                  {/* Profile Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Profile Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Education Level</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={student?.educationLevel || 'elementary'}
                          onChange={(e) => handleSettingsChange({ educationLevel: e.target.value })}
                        >
                          <option value="elementary">Elementary</option>
                          <option value="middle">Middle School</option>
                          <option value="high">High School</option>
                          <option value="university">University</option>
                          <option value="adult">Adult</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preferred Learning Style</label>
                        <div className="flex flex-wrap gap-2">
                          {['visual', 'auditory', 'reading', 'kinesthetic'].map((style) => (
                            <label key={style} className="flex items-center space-x-2">
                              <input 
                                type="checkbox"
                                checked={student?.preferredLearningStyle?.includes(style)}
                                onChange={(e) => {
                                  const currentStyles = student?.preferredLearningStyle || [];
                                  const newStyles = e.target.checked
                                    ? [...currentStyles, style]
                                    : currentStyles.filter(s => s !== style);
                                  handleSettingsChange({ preferredLearningStyle: newStyles });
                                }}
                                className="rounded"
                              />
                              <span className="text-sm capitalize">{style}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notification Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Notification Channels</label>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              checked={student?.settings?.notifications?.email}
                              onChange={(e) => handleSettingsChange({
                                settings: {
                                  ...student?.settings,
                                  notifications: {
                                    ...student?.settings?.notifications,
                                    email: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                            <span className="text-sm">Email Notifications</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              checked={student?.settings?.notifications?.sms}
                              onChange={(e) => handleSettingsChange({
                                settings: {
                                  ...student?.settings,
                                  notifications: {
                                    ...student?.settings?.notifications,
                                    sms: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                            <span className="text-sm">SMS Notifications</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              checked={student?.settings?.notifications?.push}
                              onChange={(e) => handleSettingsChange({
                                settings: {
                                  ...student?.settings,
                                  notifications: {
                                    ...student?.settings?.notifications,
                                    push: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                            <span className="text-sm">Push Notifications</span>
                          </label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Notification Types</label>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              checked={student?.settings?.notifications?.classReminders}
                              onChange={(e) => handleSettingsChange({
                                settings: {
                                  ...student?.settings,
                                  notifications: {
                                    ...student?.settings?.notifications,
                                    classReminders: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                            <span className="text-sm">Class Reminders</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              checked={student?.settings?.notifications?.newMessages}
                              onChange={(e) => handleSettingsChange({
                                settings: {
                                  ...student?.settings,
                                  notifications: {
                                    ...student?.settings?.notifications,
                                    newMessages: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                            <span className="text-sm">New Messages</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              checked={student?.settings?.notifications?.promotions}
                              onChange={(e) => handleSettingsChange({
                                settings: {
                                  ...student?.settings,
                                  notifications: {
                                    ...student?.settings?.notifications,
                                    promotions: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                            <span className="text-sm">Promotions</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Privacy Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Profile Visibility</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={student?.settings?.privacy?.profileVisibility || 'public'}
                          onChange={(e) => handleSettingsChange({
                            settings: {
                              ...student?.settings,
                              privacy: {
                                ...student?.settings?.privacy,
                                profileVisibility: e.target.value
                              }
                            }
                          })}
                        >
                          <option value="public">Public</option>
                          <option value="registered">Registered Users Only</option>
                          <option value="private">Private</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Progress Visibility</label>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              checked={student?.settings?.privacy?.showProgress}
                              onChange={(e) => handleSettingsChange({
                                settings: {
                                  ...student?.settings,
                                  privacy: {
                                    ...student?.settings?.privacy,
                                    showProgress: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                            <span className="text-sm">Show Learning Progress</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input 
                              type="checkbox"
                              checked={student?.settings?.privacy?.showReviews}
                              onChange={(e) => handleSettingsChange({
                                settings: {
                                  ...student?.settings,
                                  privacy: {
                                    ...student?.settings?.privacy,
                                    showReviews: e.target.checked
                                  }
                                }
                              })}
                              className="rounded"
                            />
                            <span className="text-sm">Show Reviews</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Study Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Study Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preferred Class Duration</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={student?.settings?.studyPreferences?.preferredClassDuration || 60}
                          onChange={(e) => handleSettingsChange({
                            settings: {
                              ...student?.settings,
                              studyPreferences: {
                                ...student?.settings?.studyPreferences,
                                preferredClassDuration: parseInt(e.target.value)
                              }
                            }
                          })}
                        >
                          <option value="30">30 minutes</option>
                          <option value="45">45 minutes</option>
                          <option value="60">1 hour</option>
                          <option value="90">1.5 hours</option>
                          <option value="120">2 hours</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Preferred Class Time</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={student?.settings?.studyPreferences?.preferredClassTime || 'afternoon'}
                          onChange={(e) => handleSettingsChange({
                            settings: {
                              ...student?.settings,
                              studyPreferences: {
                                ...student?.settings?.studyPreferences,
                                preferredClassTime: e.target.value
                              }
                            }
                          })}
                        >
                          <option value="morning">Morning</option>
                          <option value="afternoon">Afternoon</option>
                          <option value="evening">Evening</option>
                          <option value="night">Night</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Max Classes Per Week</label>
                        <input 
                          type="number"
                          min="1"
                          max="20"
                          className="w-full p-2 border rounded-md"
                          value={student?.settings?.studyPreferences?.maxClassesPerWeek || 5}
                          onChange={(e) => handleSettingsChange({
                            settings: {
                              ...student?.settings,
                              studyPreferences: {
                                ...student?.settings?.studyPreferences,
                                maxClassesPerWeek: parseInt(e.target.value)
                              }
                            }
                          })}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Account Settings */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Settings</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Timezone</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={student?.timezone || 'UTC'}
                          onChange={(e) => handleSettingsChange({ timezone: e.target.value })}
                        >
                          <option value="UTC">UTC</option>
                          <option value="EST">Eastern Time</option>
                          <option value="CST">Central Time</option>
                          <option value="PST">Pacific Time</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Language</label>
                        <select 
                          className="w-full p-2 border rounded-md"
                          value={student?.language || 'en'}
                          onChange={(e) => handleSettingsChange({ language: e.target.value })}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                          <option value="de">German</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <Button 
                      className="bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                      disabled={saving}
                      onClick={() => {/* All changes are saved automatically */}}
                    >
                      {saving ? 'Saving...' : 'All changes saved automatically'}
                    </Button>
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