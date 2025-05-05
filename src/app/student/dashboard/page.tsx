"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calendar, Users } from "lucide-react"

interface StudentData {
  _id: string;
  name: string;
  grade: string;
  subjects: string[];
  learningGoals: string[];
}

export default function StudentDashboard() {
  const router = useRouter();
  const [student, setStudent] = useState<StudentData | null>(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        // In a real app, you'd get the student ID from your auth system
        const studentId = "your-student-id"; // Replace with actual student ID
        const response = await fetch(`/api/students/${studentId}`);
        if (!response.ok) throw new Error("Failed to fetch student data");
        const data = await response.json() as StudentData;
        setStudent(data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, []);

  if (!student) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-3xl font-bold">Student Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
              onClick={() => router.push("/student/find-teacher")}
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
              onClick={() => router.push("/student/sessions")}
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
              onClick={() => router.push("/student/courses")}
              className="w-full"
            >
              View Courses
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 