import { Suspense } from "react"
import FindTeacherContent from "@/components/FindTeacherContent"
import { Skeleton } from "@/components/ui/skeleton"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function StudentFindTeacherPage({ params }: PageProps) {
  const { id } = await params
  
  return (
    <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
      <FindTeacherContent studentId={id} />
    </Suspense>
  )
} 