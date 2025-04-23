import Image from 'next/image';
import Link from 'next/link';

export default function GroupClassesPage() {
  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Lớp Học Nhóm</h1>
          <p className="text-xl max-w-2xl">Tham gia các lớp học nhóm với nhiều học viên khác để tiết kiệm chi phí và mở rộng mạng lưới kết nối</p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-white py-8 shadow-md">
        <div className="container mx-auto px-4">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="form-group">
              <label htmlFor="subject" className="block mb-2 font-medium">Môn Học</label>
              <select id="subject" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                <option value="">Tất cả môn học</option>
                <option value="math">Toán Học</option>
                <option value="english">Tiếng Anh</option>
                <option value="physics">Vật Lý</option>
                <option value="chemistry">Hóa Học</option>
                <option value="programming">Lập Trình</option>
                <option value="music">Âm Nhạc</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="level" className="block mb-2 font-medium">Trình Độ</label>
              <select id="level" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                <option value="">Tất cả trình độ</option>
                <option value="beginner">Cơ Bản</option>
                <option value="intermediate">Trung Cấp</option>
                <option value="advanced">Nâng Cao</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="date" className="block mb-2 font-medium">Thời Gian</label>
              <select id="date" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                <option value="">Bất kỳ thời gian</option>
                <option value="today">Hôm nay</option>
                <option value="tomorrow">Ngày mai</option>
                <option value="week">Tuần này</option>
                <option value="weekend">Cuối tuần</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="price" className="block mb-2 font-medium">Giá (VND)</label>
              <select id="price" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                <option value="">Tất cả mức giá</option>
                <option value="0-100000">Dưới 100.000</option>
                <option value="100000-200000">100.000 - 200.000</option>
                <option value="200000-300000">200.000 - 300.000</option>
                <option value="300000+">Trên 300.000</option>
              </select>
            </div>
            <div className="form-group lg:col-span-4 text-center">
              <button type="submit" className="px-6 py-3 bg-[var(--primary)] text-white rounded-md hover:bg-[var(--secondary)] transition-colors">
                Tìm Kiếm
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Class Types Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex overflow-x-auto pb-4 gap-4">
          <div className="bg-[var(--primary)] text-white px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap">
            Tất Cả
          </div>
          <div className="bg-white px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">
            Toán Học
          </div>
          <div className="bg-white px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">
            Tiếng Anh
          </div>
          <div className="bg-white px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">
            Vật Lý
          </div>
          <div className="bg-white px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">
            Hóa Học
          </div>
          <div className="bg-white px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">
            Lập Trình
          </div>
          <div className="bg-white px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">
            Âm Nhạc
          </div>
          <div className="bg-white px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">
            Kinh Doanh
          </div>
          <div className="bg-white px-6 py-3 rounded-lg cursor-pointer whitespace-nowrap hover:bg-gray-100 transition-colors">
            Nghệ Thuật
          </div>
        </div>
      </div>

      {/* Upcoming Classes Section */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-2">Lớp Học Sắp Diễn Ra</h2>
        <p className="text-[var(--gray)] mb-8">Các lớp học nhóm sẽ diễn ra trong 3 ngày tới. Đăng ký ngay để đảm bảo có chỗ!</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {classes.map((classItem, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:-translate-y-2 transition-transform duration-300">
              <div className="relative">
                <div className="h-48 w-full relative">
                  <Image 
                    src={classItem.image} 
                    alt={classItem.title}
                    fill
                    style={{objectFit: 'cover'}}
                  />
                </div>
                <div className="absolute top-3 left-3 bg-[var(--accent)] text-white text-xs font-bold px-2 py-1 rounded">
                  {classItem.subject}
                </div>
                <div className="absolute top-3 right-3 bg-[var(--dark)] text-white text-xs font-bold px-2 py-1 rounded">
                  {classItem.level}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3">{classItem.title}</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image 
                      src={classItem.teacherImage} 
                      alt={classItem.teacherName}
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="font-medium">{classItem.teacherName}</div>
                </div>
                <div className="space-y-2 mb-4 text-[var(--gray)] text-sm">
                  <div className="flex items-center">
                    <span className="mr-2">📅</span> {classItem.date}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">👥</span> {classItem.students}/{classItem.capacity} học viên đã đăng ký
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">🌐</span> {classItem.language}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="font-bold text-[var(--primary)]">{classItem.price}</div>
                  <Link href={`/group-classes/${classItem.id}`} className="btn btn-primary py-2 px-4">
                    Đăng Ký
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
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-[var(--light)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tại Sao Nên Tham Gia Lớp Học Nhóm?</h2>
            <p className="text-[var(--gray)] max-w-2xl mx-auto">Học nhóm mang lại nhiều lợi ích và là cách hiệu quả để học tập với chi phí hợp lý</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl text-[var(--primary)] mb-6">💰</div>
              <h3 className="text-xl font-bold mb-4">Tiết Kiệm Chi Phí</h3>
              <p className="text-[var(--gray)]">Chi phí học tập thấp hơn so với học 1-1, giúp bạn tiết kiệm đáng kể.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl text-[var(--primary)] mb-6">👥</div>
              <h3 className="text-xl font-bold mb-4">Học Hỏi Từ Bạn Bè</h3>
              <p className="text-[var(--gray)]">Trao đổi kiến thức và học hỏi từ các học viên khác trong lớp.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl text-[var(--primary)] mb-6">🌐</div>
              <h3 className="text-xl font-bold mb-4">Mở Rộng Mạng Lưới</h3>
              <p className="text-[var(--gray)]">Kết nối với những người có cùng sở thích và mục tiêu học tập.</p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="text-5xl text-[var(--primary)] mb-6">🎯</div>
              <h3 className="text-xl font-bold mb-4">Động Lực Học Tập</h3>
              <p className="text-[var(--gray)]">Môi trường học nhóm tạo động lực và trách nhiệm để duy trì việc học.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Bạn Muốn Tạo Lớp Học Nhóm?</h2>
        <p className="text-[var(--gray)] mb-8 max-w-2xl mx-auto">Nếu bạn là giáo viên trên EduConnect, bạn có thể tạo và quản lý các lớp học nhóm của riêng mình. Chia sẻ kiến thức với nhiều học viên cùng lúc và tăng thu nhập.</p>
        <Link href="/create-group-class" className="btn btn-primary px-8 py-3">
          Tạo Lớp Học Nhóm
        </Link>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Học Viên Nói Gì Về Lớp Học Nhóm</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-[var(--light)] p-8 rounded-lg">
                <div className="text-yellow-400 text-2xl mb-4">★★★★★</div>
                <p className="text-[var(--gray)] italic mb-6">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <Image 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-[var(--gray)]">{testimonial.subject}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

// Sample data
const classes = [
  {
    id: '1',
    title: 'Giải Phương Trình Bậc Hai Nâng Cao',
    subject: 'Toán Học',
    level: 'B2',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    teacherName: 'Nguyễn Văn A',
    teacherImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '25/04/2025, 19:30 - 21:00',
    students: 5,
    capacity: 10,
    language: 'Tiếng Việt',
    price: '100.000 VND'
  },
  {
    id: '2',
    title: 'Luyện Nói Tiếng Anh Giao Tiếp',
    subject: 'Tiếng Anh',
    level: 'B1',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    teacherName: 'Trần Thị B',
    teacherImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '26/04/2025, 20:00 - 21:30',
    students: 8,
    capacity: 12,
    language: 'Tiếng Anh',
    price: '120.000 VND'
  },
  {
    id: '3',
    title: 'Nhập Môn Python Cho Người Mới Bắt Đầu',
    subject: 'Lập Trình',
    level: 'A2',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    teacherName: 'Lê Văn C',
    teacherImage: 'https://randomuser.me/api/portraits/men/67.jpg',
    date: '27/04/2025, 14:00 - 16:00',
    students: 6,
    capacity: 15,
    language: 'Tiếng Việt',
    price: '150.000 VND'
  },
  {
    id: '4',
    title: 'Cơ Học Lượng Tử Cơ Bản',
    subject: 'Vật Lý',
    level: 'B2',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    teacherName: 'Hoàng Văn E',
    teacherImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    date: '25/04/2025, 18:00 - 19:30',
    students: 4,
    capacity: 8,
    language: 'Tiếng Việt',
    price: '180.000 VND'
  },
  {
    id: '5',
    title: 'Hóa Hữu Cơ: Phản Ứng Tổng Hợp',
    subject: 'Hóa Học',
    level: 'B1',
    image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    teacherName: 'Ngô Thị F',
    teacherImage: 'https://randomuser.me/api/portraits/women/56.jpg',
    date: '26/04/2025, 15:00 - 16:30',
    students: 7,
    capacity: 10,
    language: 'Tiếng Việt',
    price: '130.000 VND'
  },
  {
    id: '6',
    title: 'Nhập Môn Guitar Acoustic',
    subject: 'Âm Nhạc',
    level: 'A1',
    image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60',
    teacherName: 'Phạm Thị D',
    teacherImage: 'https://randomuser.me/api/portraits/women/33.jpg',
    date: '27/04/2025, 10:00 - 11:30',
    students: 5,
    capacity: 8,
    language: 'Tiếng Việt',
    price: '200.000 VND'
  }
];

const testimonials = [
  {
    name: 'Trần Đức',
    subject: 'Học viên Lập trình',
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    content: 'Lớp học nhóm về lập trình Python của thầy Lê Văn C rất thú vị và bổ ích. Tôi đã học được rất nhiều kiến thức mới và kết bạn với nhiều người có cùng sở thích.'
  },
  {
    name: 'Nguyễn Thảo',
    subject: 'Học viên Tiếng Anh',
    image: 'https://randomuser.me/api/portraits/women/63.jpg',
    content: 'Tôi đã tham gia lớp học nhóm tiếng Anh giao tiếp của cô Trần Thị B. Môi trường học tập rất thoải mái và tôi có cơ hội thực hành nói tiếng Anh với nhiều bạn học khác.'
  },
  {
    name: 'Hoàng Minh',
    subject: 'Học viên Toán học',
    image: 'https://randomuser.me/api/portraits/men/41.jpg',
    content: 'Lớp học nhóm về giải phương trình bậc hai nâng cao của thầy Nguyễn Văn A giúp tôi hiểu sâu hơn về các phương pháp giải và ứng dụng trong các bài toán thực tế.'
  }
];
