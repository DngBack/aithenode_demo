"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TeacherCard } from "@/components/TeacherCard"
import { useToast } from "@/components/ui/use-toast"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

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

interface FindTeacherContentProps {
  studentId: string
}

const SUBJECTS = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "History",
  "Computer Science",
  "Programming",
  "Art",
  "Music",
]

const AVAILABILITY = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
]

export default function FindTeacherContent({ studentId }: FindTeacherContentProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [minRating, setMinRating] = useState("")
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const fetchTeachers = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (searchQuery) params.append("search", searchQuery)
      if (selectedSubjects.length) params.append("subjects", selectedSubjects.join(","))
      if (selectedAvailability.length) params.append("availability", selectedAvailability.join(","))
      if (minPrice) params.append("minPrice", minPrice)
      if (maxPrice) params.append("maxPrice", maxPrice)
      if (minRating) params.append("minRating", minRating)

      const response = await fetch(`/api/teachers?${params.toString()}`)
      if (!response.ok) throw new Error("Failed to fetch teachers")
      
      const data = await response.json() as Teacher[]
      setTeachers(data)
    } catch (error) {
      console.error("Error fetching teachers:", error)
      toast({
        title: "Error",
        description: "Failed to fetch teachers. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const addSubject = (subject: string) => {
    if (!selectedSubjects.includes(subject)) {
      setSelectedSubjects([...selectedSubjects, subject])
    }
  }

  const removeSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter(s => s !== subject))
  }

  const addAvailability = (day: string) => {
    if (!selectedAvailability.includes(day)) {
      setSelectedAvailability([...selectedAvailability, day])
    }
  }

  const removeAvailability = (day: string) => {
    setSelectedAvailability(selectedAvailability.filter(d => d !== day))
  }

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedSubjects([])
    setSelectedAvailability([])
    setMinPrice("")
    setMaxPrice("")
    setMinRating("")
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Find a Teacher</h1>
          <Button variant="outline" onClick={clearFilters}>
            Clear Filters
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Input
            placeholder="Search by name or subject..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <Select onValueChange={addSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {SUBJECTS.map((subject) => (
                <SelectItem key={subject} value={subject}>
                  {subject}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={addAvailability}>
            <SelectTrigger>
              <SelectValue placeholder="Select availability" />
            </SelectTrigger>
            <SelectContent>
              {AVAILABILITY.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Min Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          <Select onValueChange={setMinRating}>
            <SelectTrigger>
              <SelectValue placeholder="Minimum Rating" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4">4+ Stars</SelectItem>
              <SelectItem value="3">3+ Stars</SelectItem>
              <SelectItem value="2">2+ Stars</SelectItem>
              <SelectItem value="1">1+ Star</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(selectedSubjects.length > 0 || selectedAvailability.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {selectedSubjects.map((subject) => (
              <Badge key={subject} variant="secondary" className="flex items-center gap-1">
                {subject}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeSubject(subject)}
                />
              </Badge>
            ))}
            {selectedAvailability.map((day) => (
              <Badge key={day} variant="secondary" className="flex items-center gap-1">
                {day}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => removeAvailability(day)}
                />
              </Badge>
            ))}
          </div>
        )}

        <Button onClick={fetchTeachers} disabled={loading} className="w-full md:w-auto">
          {loading ? "Searching..." : "Find Teachers"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <TeacherCard
            key={teacher._id}
            teacher={teacher}
            onBookSession={() => router.push(`/student/${studentId}/book-session/${teacher._id}`)}
          />
        ))}
        {teachers.length === 0 && !loading && (
          <div className="col-span-full text-center text-gray-500">
            No teachers found matching your criteria.
          </div>
        )}
      </div>
    </div>
  )
} 