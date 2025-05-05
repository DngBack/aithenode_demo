import { connectToDatabase } from "@/lib/mongodb"
import Teacher from "@/models/Teacher"

const teachers = [
  {
    name: "John Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    subjects: ["Mathematics", "Physics"],
    rating: 4.8,
    hourlyRate: 45,
    availability: ["Monday", "Wednesday", "Friday"],
    bio: "Experienced math and physics teacher with 10 years of teaching experience. Specialized in calculus and mechanics.",
    email: "john.smith@example.com",
    password: "hashed_password_here", // In production, use proper password hashing
  },
  {
    name: "Sarah Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    subjects: ["English", "History"],
    rating: 4.9,
    hourlyRate: 50,
    availability: ["Tuesday", "Thursday", "Saturday"],
    bio: "Passionate English and History teacher. Expert in literature analysis and historical research methods.",
    email: "sarah.johnson@example.com",
    password: "hashed_password_here",
  },
  {
    name: "Michael Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    subjects: ["Computer Science", "Mathematics"],
    rating: 4.7,
    hourlyRate: 55,
    availability: ["Monday", "Tuesday", "Thursday"],
    bio: "Software engineer turned teacher. Specialized in programming and advanced mathematics.",
    email: "michael.chen@example.com",
    password: "hashed_password_here",
  },
  {
    name: "Emily Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    subjects: ["Biology", "Chemistry"],
    rating: 4.6,
    hourlyRate: 40,
    availability: ["Wednesday", "Friday", "Saturday"],
    bio: "Biology and Chemistry teacher with a background in medical research. Makes complex concepts easy to understand.",
    email: "emily.brown@example.com",
    password: "hashed_password_here",
  },
]

async function seedTeachers() {
  try {
    await connectToDatabase()
    
    // Clear existing teachers
    await Teacher.deleteMany({})
    
    // Insert new teachers
    await Teacher.insertMany(teachers)
    
    console.log("Teachers seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding teachers:", error)
    process.exit(1)
  }
}

seedTeachers() 