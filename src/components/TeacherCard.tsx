import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

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

interface TeacherCardProps {
  teacher: Teacher
  onBookSession: () => void
}

export function TeacherCard({ teacher, onBookSession }: TeacherCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={teacher.avatar} alt={teacher.name} />
          <AvatarFallback>{teacher.name.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{teacher.name}</h3>
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span>{teacher.rating.toFixed(1)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div>
            <span className="font-medium">Subjects: </span>
            {teacher.subjects.join(", ")}
          </div>
          <div>
            <span className="font-medium">Rate: </span>
            ${teacher.hourlyRate}/hour
          </div>
          <div>
            <span className="font-medium">Available: </span>
            {teacher.availability.join(", ")}
          </div>
          <p className="text-sm text-gray-600">{teacher.bio}</p>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onBookSession} className="w-full">
          Book Session
        </Button>
      </CardFooter>
    </Card>
  )
} 