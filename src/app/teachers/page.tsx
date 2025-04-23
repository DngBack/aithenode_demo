import Link from 'next/link';
import Image from 'next/image';

export default function TeachersPage() {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Tìm Giáo Viên</h1>
          <p className="text-xl max-w-2xl">Khám phá hàng nghìn giáo viên chuyên môn trong nhiều lĩnh vực khác nhau. Lọc theo môn học, ngôn ngữ, giá cả và thời gian để tìm người phù hợp nhất với nhu cầu của bạn.</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="form-group">
              <label htmlFor="subject" className="block mb-2 font-medium">Môn Học</label>
              <select id="subject" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                <option value="">Tất cả môn học</option>
                <option value="math">Toán Học</option>
                <option value="english">Tiếng Anh</option>
                <option value="programming">Lập Trình</option>
                <option value="physics">Vật Lý</option>
                <option value="chemistry">Hóa Học</option>
                <option value="music">Âm Nhạc</option>
                <option value="business">Kinh Doanh</option>
                <option value="art">Nghệ Thuật</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="language" className="block mb-2 font-medium">Ngôn Ngữ Giảng Dạy</label>
              <select id="language" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                <option value="">Tất cả ngôn ngữ</option>
                <option value="vietnamese">Tiếng Việt</option>
                <option value="english">Tiếng Anh</option>
                <option value="french">Tiếng Pháp</option>
                <option value="chinese">Tiếng Trung</option>
                <option value="japanese">Tiếng Nhật</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price" className="block mb-2 font-medium">Giá (VND/giờ)</label>
              <select id="price" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                <option value="">Tất cả mức giá</option>
                <option value="0-100000">Dưới 100.000</option>
                <option value="100000-200000">100.000 - 200.000</option>
                <option value="200000-300000">200.000 - 300.000</option>
                <option value="300000+">Trên 300.000</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="availability" className="block mb-2 font-medium">Thời Gian</label>
              <select id="availability" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                <option value="">Bất kỳ thời gian</option>
                <option value="morning">Buổi sáng</option>
                <option value="afternoon">Buổi chiều</option>
                <option value="evening">Buổi tối</option>
                <option value="weekend">Cuối tuần</option>
              </select>
            </div>
            <div className="form-group flex items-end">
              <button type="submit" className="w-full p-3 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] transition-colors">
                Tìm Kiếm
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Teachers List Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Kết quả tìm kiếm (120)</h2>
            <div className="flex items-center">
              <label htmlFor="sort" className="mr-2">Sắp xếp theo:</label>
              <select id="sort" className="p-2 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                <option value="relevance">Độ phù hợp</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="price_low">Giá: Thấp đến cao</option>
                <option value="price_high">Giá: Cao đến thấp</option>
                <option value="experience">Kinh nghiệm</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teachers.map((teacher, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2">
                <div className="relative">
                  <div className="h-48 w-full relative">
                    <Image 
                      src={teacher.image} 
                      alt={teacher.name}
                      fill
                      style={{objectFit: 'cover'}}
                    />
                  </div>
                  {teacher.badge && (
                    <div className="absolute top-3 left-3 bg-[var(--primary)] text-white text-xs font-bold px-2 py-1 rounded">
                      {teacher.badge}
                    </div>
                  )}
                  {teacher.isOnline && (
                    <div className="absolute top-3 right-3 bg-[var(--success)] text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-1"></span> Online
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{teacher.name}</h3>
                    <div className="flex items-center">
                      <div className="text-yellow-400 mr-1">★</div>
                      <span>{teacher.rating}</span>
                    </div>
                  </div>
                  <p className="text-[var(--gray)] mb-3">{teacher.subject}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {teacher.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="bg-[var(--light)] text-[var(--gray)] text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-sm text-[var(--gray)] mb-4">
                    <span className="mr-4">
                      <span className="mr-1">👨‍🎓</span> {teacher.students} học viên
                    </span>
                    <span>
                      <span className="mr-1">🕒</span> {teacher.lessons} buổi học
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-[var(--primary)]">{teacher.price}</div>
                    <Link href={`/teachers/${teacher.id}`} className="btn btn-primary py-2 px-4">
                      Xem Hồ Sơ
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-12">
            <div className="flex">
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-[var(--light)]">
                &laquo;
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 bg-[var(--primary)] text-white">
                1
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-[var(--light)]">
                2
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-[var(--light)]">
                3
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-[var(--light)]">
                4
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 hover:bg-[var(--light)]">
                5
              </button>
              <button className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-[var(--light)]">
                &raquo;
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[var(--light)]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Không tìm thấy giáo viên phù hợp?</h2>
          <p className="text-[var(--gray)] mb-8 max-w-2xl mx-auto">
            Đăng yêu cầu của bạn và để giáo viên liên hệ với bạn. Mô tả nhu cầu học tập và giáo viên phù hợp sẽ liên hệ với bạn.
          </p>
          <Link href="/request-teacher" className="btn btn-primary">
            Đăng Yêu Cầu Tìm Giáo Viên
          </Link>
        </div>
      </section>
    </>
  );
}

// Sample data
const teachers = [
  {
    id: '1',
    name: 'Nguyễn Văn A',
    subject: 'Toán học | Đại số, Giải tích',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    badge: 'Chuyên Nghiệp',
    isOnline: true,
    rating: 4.9,
    students: 256,
    lessons: 1450,
    price: '200.000 VND/giờ',
    tags: ['Đại số', 'Giải tích', 'THPT', 'Đại học']
  },
  {
    id: '2',
    name: 'Trần Thị B',
    subject: 'Tiếng Anh | Giao tiếp, IELTS',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    badge: 'Chuyên Nghiệp',
    isOnline: false,
    rating: 4.8,
    students: 198,
    lessons: 1280,
    price: '250.000 VND/giờ',
    tags: ['IELTS', 'TOEFL', 'Giao tiếp', 'Ngữ pháp']
  },
  {
    id: '3',
    name: 'Lê Văn C',
    subject: 'Lập Trình | Python, JavaScript',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    badge: 'Gia Sư Cộng Đồng',
    isOnline: true,
    rating: 4.7,
    students: 145,
    lessons: 890,
    price: '180.000 VND/giờ',
    tags: ['Python', 'JavaScript', 'Web Dev', 'Data Science']
  },
  {
    id: '4',
    name: 'Phạm Thị D',
    subject: 'Âm Nhạc | Piano, Guitar',
    image: 'https://randomuser.me/api/portraits/women/33.jpg',
    badge: 'Chuyên Nghiệp',
    isOnline: false,
    rating: 5.0,
    students: 120,
    lessons: 760,
    price: '300.000 VND/giờ',
    tags: ['Piano', 'Guitar', 'Nhạc lý', 'Sáng tác']
  },
  {
    id: '5',
    name: 'Hoàng Văn E',
    subject: 'Vật Lý | Cơ học, Điện từ học',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    badge: 'Gia Sư Cộng Đồng',
    isOnline: true,
    rating: 4.6,
    students: 98,
    lessons: 520,
    price: '150.000 VND/giờ',
    tags: ['Cơ học', 'Điện từ học', 'THPT', 'Đại học']
  },
  {
    id: '6',
    name: 'Ngô Thị F',
    subject: 'Hóa Học | Hóa hữu cơ, Hóa phân tích',
    image: 'https://randomuser.me/api/portraits/women/56.jpg',
    badge: 'Chuyên Nghiệp',
    isOnline: false,
    rating: 4.5,
    students: 87,
    lessons: 430,
    price: '220.000 VND/giờ',
    tags: ['Hóa hữu cơ', 'Hóa phân tích', 'THPT', 'Đại học']
  }
];
