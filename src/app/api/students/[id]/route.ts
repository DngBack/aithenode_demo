import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Student from "@/models/Student"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()

    const student = await Student.findById(params.id)
      .select("name grade subjects learningGoals")
      .lean()

    if (!student) {
      return NextResponse.json(
        { error: "Student not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(student)
  } catch (error) {
    console.error("Error fetching student:", error)
    return NextResponse.json(
      { error: "Failed to fetch student" },
      { status: 500 }
    )
  }
} 