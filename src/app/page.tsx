import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Welcome to EduConnect
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Connect with expert teachers or find eager students. Start your learning journey today.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/signup"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Get started
              </Link>
              <Link href="/signin" className="text-sm font-semibold leading-6 text-gray-900">
                Sign in <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="bg-gray-100 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Learn Faster</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to excel in your studies
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Expert Teachers
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Learn from experienced teachers who are passionate about their subjects.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Flexible Learning
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Choose your own schedule and learn at your own pace.
                  </p>
                </dd>
              </div>
              <div className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  Group Classes
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">
                    Join group classes to learn with others and share experiences.
                  </p>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

// Sample data
const popularSubjects = [
  { name: 'Toán Học', icon: '🧮', teacherCount: '1,245', slug: 'math' },
  { name: 'Tiếng Anh', icon: '🔤', teacherCount: '1,876', slug: 'english' },
  { name: 'Lập Trình', icon: '💻', teacherCount: '932', slug: 'programming' },
  { name: 'Vật Lý', icon: '⚛️', teacherCount: '654', slug: 'physics' },
  { name: 'Hóa Học', icon: '🧪', teacherCount: '521', slug: 'chemistry' },
  { name: 'Âm Nhạc', icon: '🎵', teacherCount: '478', slug: 'music' },
  { name: 'Kinh Doanh', icon: '📊', teacherCount: '765', slug: 'business' },
  { name: 'Nghệ Thuật', icon: '🎨', teacherCount: '389', slug: 'art' },
];

const featuredTeachers = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    subject: 'Toán học | Đại số, Giải tích',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    badge: 'Chuyên Nghiệp',
    rating: 4.9,
    reviewCount: 120,
    price: '200.000 VND/giờ'
  },
  {
    id: '2',
    name: 'Trần Thị B',
    subject: 'Tiếng Anh | Giao tiếp, IELTS',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    badge: 'Chuyên Nghiệp',
    rating: 4.8,
    reviewCount: 98,
    price: '250.000 VND/giờ'
  },
  {
    id: '3',
    name: 'Lê Văn C',
    subject: 'Lập Trình | Python, JavaScript',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    badge: 'Gia Sư Cộng Đồng',
    rating: 4.7,
    reviewCount: 83,
    price: '180.000 VND/giờ'
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    subject: 'Âm Nhạc | Piano, Guitar',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    badge: 'Chuyên Nghiệp',
    rating: 5.0,
    reviewCount: 72,
    price: '300.000 VND/giờ'
  }
];

const testimonials = [
  {
    name: 'Hoàng Minh',
    subject: 'Học viên Toán học',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    content: 'Tôi đã học với thầy Nguyễn Văn A trong 3 tháng để chuẩn bị cho kỳ thi đại học và đã cải thiện điểm số đáng kể. Thầy giải thích các khái niệm phức tạp một cách dễ hiểu.'
  },
  {
    name: 'Nguyễn Thảo',
    subject: 'Học viên Tiếng Anh',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    content: 'Cô Trần Thị B là một giáo viên tuyệt vời! Sau 6 tháng học với cô, điểm IELTS của tôi đã tăng từ 6.0 lên 7.5. Cô rất kiên nhẫn và luôn động viên tôi.'
  },
  {
    name: 'Trần Đức',
    subject: 'Học viên Lập trình',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    content: 'Tôi đã tham gia khóa học Python của thầy Lê Văn C mà không có kiến thức lập trình trước đó. Giờ đây tôi đã có thể tự tin xây dựng các ứng dụng web đơn giản.'
  }
];
