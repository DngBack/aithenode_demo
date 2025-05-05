"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, SlidersHorizontal } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TeacherCard } from "@/components/TeacherCard"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const subjects = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Geography",
  "Computer Science",
]

interface Teacher {
  _id: string
  name: string
  avatar?: string
  subjects: string[]
  rating: number
  hourlyRate: number
  availability: string[]
  bio: string
}

interface Student {
  _id: string
  name: string
  grade: string
  subjects: string[]
  learningGoals: string[]
}

export function FindTeacherContent({ studentId }: { studentId: string }) {
  const router = useRouter()
  const { toast } = useToast()
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [student, setStudent] = useState<Student | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [priceRange, setPriceRange] = useState<string>("")

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await fetch(`/api/students/${studentId}`)
        if (!response.ok) throw new Error("Failed to fetch student data")
        const data = await response.json() as Student
        setStudent(data)
        // Set initial subject filter based on student's subjects
        if (data.subjects?.length > 0) {
          setSelectedSubject(data.subjects[0])
        }
      } catch (error) {
        console.error("Error fetching student data:", error)
        toast({
          title: "Error",
          description: "Failed to fetch student data. Please try again.",
          variant: "destructive",
        })
      }
    }

    fetchStudentData()
  }, [studentId, toast])

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true)
        const params = new URLSearchParams()
        if (searchQuery) params.append("search", searchQuery)
        if (selectedSubject) params.append("subject", selectedSubject)
        if (priceRange) {
          const [min, max] = priceRange.split("-")
          if (min) params.append("minPrice", min)
          if (max) params.append("maxPrice", max)
        }

        const response = await fetch(`/api/teachers?${params.toString()}`)
        if (!response.ok) {
          throw new Error("Failed to fetch teachers")
        }
        
        const data = await response.json() as Teacher[]
        setTeachers(data)
      } catch (error) {
        console.error("Error fetching teachers:", error)
        toast({
          title: "Error",
          description: "Failed to fetch teachers. Please try again.",
          variant: "destructive",
        })
        setTeachers([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchTeachers, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, selectedSubject, priceRange, toast])

  const handleBook = (teacherId: string) => {
    router.push(`/student/${studentId}/booking/${teacherId}`)
  }

  if (!student) {
    return (
      <div className="container py-8">
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="mb-8 space-y-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold">Find a Teacher</h1>
          <p className="text-muted-foreground">
            Find the perfect teacher for your learning journey, {student.name}
          </p>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search teachers by name or subject..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full sm:w-auto">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Teachers</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Subjects</SelectItem>
                      {subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range (per hour)</label>
                  <Select value={priceRange} onValueChange={setPriceRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select price range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any Price</SelectItem>
                      <SelectItem value="0-25">$0 - $25</SelectItem>
                      <SelectItem value="26-50">$26 - $50</SelectItem>
                      <SelectItem value="51-100">$51 - $100</SelectItem>
                      <SelectItem value="101-">$101+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[300px] animate-pulse rounded-lg bg-muted" />
          ))}
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teachers.map((teacher) => (
              <TeacherCard
                key={teacher._id}
                teacher={teacher}
                onBook={handleBook}
              />
            ))}
          </div>

          {teachers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No teachers found matching your criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
} 