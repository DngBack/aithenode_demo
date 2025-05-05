import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Teacher from "@/models/Teacher"

export async function GET(request: Request) {
  try {
    // Connect to database
    const db = await connectToDatabase()
    if (!db) {
      console.error("Failed to connect to database")
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      )
    }

    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const subjects = searchParams.get("subjects")?.split(",")
    const availability = searchParams.get("availability")?.split(",")
    const minPrice = searchParams.get("minPrice")
    const maxPrice = searchParams.get("maxPrice")
    const minRating = searchParams.get("minRating")

    let query: any = {}

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { subjects: { $regex: search, $options: "i" } },
        { bio: { $regex: search, $options: "i" } }
      ]
    }

    if (subjects?.length) {
      query.subjects = { $in: subjects }
    }

    if (availability?.length) {
      query.availability = { $in: availability }
    }

    if (minPrice || maxPrice) {
      query.hourlyRate = {}
      if (minPrice) query.hourlyRate.$gte = Number(minPrice)
      if (maxPrice) query.hourlyRate.$lte = Number(maxPrice)
    }

    if (minRating) {
      query.rating = { $gte: Number(minRating) }
    }

    console.log("MongoDB Query:", JSON.stringify(query, null, 2))

    const teachers = await Teacher.find(query)
      .select("name avatar subjects rating hourlyRate availability bio")
      .sort({ rating: -1 })
      .limit(20)
      .lean()

    console.log("Found teachers:", teachers.length)

    return NextResponse.json(teachers)
  } catch (error) {
    console.error("Detailed error in /api/teachers:", error)
    return NextResponse.json(
      { error: "Failed to fetch teachers", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
} 