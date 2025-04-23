import Image from 'next/image';
import Link from 'next/link';

// This function is required for static export with dynamic routes
export function generateStaticParams() {
  // For a real application, this would fetch all possible IDs from an API or database
  // For this demo, we'll just pre-generate a few IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' }
  ];
}

export default function TeacherProfilePage() {
  // In a real application, we would fetch the teacher data based on the ID
  // For this demo, we'll use a sample teacher
  const teacher = {
    id: '1',
    name: 'Nguyễn Văn A',
    badge: 'Giáo Viên Chuyên Nghiệp',
    subject: 'Toán học | Đại số, Giải tích',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4.9,
    reviewCount: 120,
    price: '200.000 VND/giờ',
    introduction: 'Tôi là giáo viên toán học với hơn 10 năm kinh nghiệm giảng dạy. Tôi đã giúp hàng trăm học sinh cải thiện kết quả học tập và đạt điểm cao trong các kỳ thi quan trọng. Phương pháp giảng dạy của tôi tập trung vào việc xây dựng nền tảng vững chắc và phát triển tư duy logic.',
    education: 'Thạc sĩ Toán học ứng dụng, Đại học Quốc gia Hà Nội',
    experience: '10+ năm giảng dạy tại các trường THPT và trung tâm gia sư',
    teachingStyle: 'Tôi tin rằng mỗi học sinh đều có tiềm năng riêng và cần được hướng dẫn theo cách phù hợp với phong cách học tập của họ. Tôi thường kết hợp lý thuyết với các ví dụ thực tế và bài tập thực hành để giúp học sinh hiểu sâu và nhớ lâu.',
    subjects: [
      { name: 'Đại Số', level: 'THPT, Đại học', price: '200.000 VND/giờ' },
      { name: 'Giải Tích', level: 'THPT, Đại học', price: '220.000 VND/giờ' },
      { name: 'Hình Học', level: 'THCS, THPT', price: '200.000 VND/giờ' }
    ],
    schedule: {
      monday: ['08:00 - 10:00', '14:00 - 18:00'],
      tuesday: ['09:00 - 12:00', '15:00 - 20:00'],
      wednesday: ['08:00 - 10:00', '14:00 - 18:00'],
      thursday: ['09:00 - 12:00', '15:00 - 20:00'],
      friday: ['08:00 - 10:00', '14:00 - 18:00'],
      saturday: ['09:00 - 15:00'],
      sunday: []
    },
    reviews: [
      {
        id: 1,
        student: 'Hoàng Minh',
        image: 'https://randomuser.me/api/portraits/men/41.jpg',
        rating: 5,
        date: '15/03/2025',
        content: 'Thầy Nguyễn Văn A là một giáo viên tuyệt vời! Tôi đã học với thầy trong 3 tháng để chuẩn bị cho kỳ thi đại học và đã cải thiện điểm số đáng kể. Thầy giải thích các khái niệm phức tạp một cách dễ hiểu và luôn kiên nhẫn với những câu hỏi của tôi.'
      },
      {
        id: 2,
        student: 'Nguyễn Thảo',
        image: 'https://randomuser.me/api/portraits/women/63.jpg',
        rating: 5,
        date: '02/02/2025',
        content: 'Tôi rất hài lòng với phương pháp giảng dạy của thầy. Thầy không chỉ giúp tôi hiểu bài mà còn truyền cảm hứng để tôi yêu thích môn toán hơn. Các bài tập thầy giao rất phù hợp với trình độ và giúp tôi tiến bộ từng ngày.'
      },
      {
        id: 3,
        student: 'Trần Đức',
        image: 'https://randomuser.me/api/portraits/men/22.jpg',
        rating: 4,
        date: '10/01/2025',
        content: 'Thầy có kiến thức chuyên môn sâu rộng và luôn chuẩn bị bài giảng kỹ lưỡng. Tôi đặc biệt thích cách thầy liên hệ toán học với các vấn đề thực tế, giúp tôi hiểu được ứng dụng của những gì mình đang học.'
      }
    ]
  };

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Hồ Sơ Giáo Viên</h1>
          <p className="text-xl max-w-2xl">Tìm hiểu thêm về giáo viên và đặt lịch học</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Teacher Profile Card */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex flex-col md:flex-row md:items-start gap-6">
                <div className="w-32 h-32 mx-auto md:mx-0 rounded-full overflow-hidden flex-shrink-0">
                  <Image 
                    src={teacher.image} 
                    alt={teacher.name}
                    width={128}
                    height={128}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold">{teacher.name}</h2>
                    <div className="text-sm bg-[var(--primary)] text-white px-2 py-0.5 rounded inline-block">
                      {teacher.badge}
                    </div>
                  </div>
                  <p className="text-[var(--gray)] mb-2">{teacher.subject}</p>
                  <div className="flex items-center justify-center md:justify-start mb-4">
                    <div className="text-yellow-400 mr-1">★★★★★</div>
                    <span className="text-sm text-[var(--gray)]">{teacher.rating} ({teacher.reviewCount} đánh giá)</span>
                  </div>
                  <div className="text-xl font-bold text-[var(--primary)] mb-4">{teacher.price}</div>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/booking/${teacher.id}`} className="btn btn-primary">
                      Đặt Lịch Học
                    </Link>
                    <button className="btn btn-outline">
                      Nhắn Tin
                    </button>
                    <button className="btn btn-outline">
                      Lưu ♡
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-8">
              <div className="flex border-b border-gray-200">
                <button className="px-4 py-2 font-medium border-b-2 border-[var(--primary)] text-[var(--primary)]">
                  Giới Thiệu
                </button>
                <button className="px-4 py-2 font-medium text-[var(--gray)] hover:text-[var(--primary)]">
                  Môn Học & Giá
                </button>
                <button className="px-4 py-2 font-medium text-[var(--gray)] hover:text-[var(--primary)]">
                  Lịch Dạy
                </button>
                <button className="px-4 py-2 font-medium text-[var(--gray)] hover:text-[var(--primary)]">
                  Đánh Giá ({teacher.reviews.length})
                </button>
              </div>
            </div>

            {/* Introduction */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4">Giới Thiệu</h3>
              <p className="mb-6 text-[var(--gray)]">{teacher.introduction}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-bold mb-2">Học Vấn</h4>
                  <p className="text-[var(--gray)]">{teacher.education}</p>
                </div>
                <div>
                  <h4 className="font-bold mb-2">Kinh Nghiệm</h4>
                  <p className="text-[var(--gray)]">{teacher.experience}</p>
                </div>
              </div>
              
              <h4 className="font-bold mb-2">Phương Pháp Giảng Dạy</h4>
              <p className="text-[var(--gray)]">{teacher.teachingStyle}</p>
            </div>

            {/* Subjects & Pricing */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4">Môn Học & Giá</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-left">Môn Học</th>
                      <th className="py-3 text-left">Trình Độ</th>
                      <th className="py-3 text-left">Giá</th>
                      <th className="py-3 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {teacher.subjects.map((subject, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-4 font-medium">{subject.name}</td>
                        <td className="py-4 text-[var(--gray)]">{subject.level}</td>
                        <td className="py-4 font-bold text-[var(--primary)]">{subject.price}</td>
                        <td className="py-4">
                          <Link href={`/booking/${teacher.id}?subject=${subject.name}`} className="btn btn-sm btn-primary">
                            Đặt Lịch
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-bold mb-4">Lịch Dạy</h3>
              <p className="mb-4 text-[var(--gray)]">Giờ theo múi giờ Việt Nam (GMT+7)</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Thứ Hai</h4>
                  {teacher.schedule.monday.length > 0 ? (
                    <ul className="space-y-1">
                      {teacher.schedule.monday.map((time, index) => (
                        <li key={index} className="text-[var(--gray)]">{time}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--gray)]">Không có lịch dạy</p>
                  )}
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Thứ Ba</h4>
                  {teacher.schedule.tuesday.length > 0 ? (
                    <ul className="space-y-1">
                      {teacher.schedule.tuesday.map((time, index) => (
                        <li key={index} className="text-[var(--gray)]">{time}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--gray)]">Không có lịch dạy</p>
                  )}
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Thứ Tư</h4>
                  {teacher.schedule.wednesday.length > 0 ? (
                    <ul className="space-y-1">
                      {teacher.schedule.wednesday.map((time, index) => (
                        <li key={index} className="text-[var(--gray)]">{time}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--gray)]">Không có lịch dạy</p>
                  )}
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Thứ Năm</h4>
                  {teacher.schedule.thursday.length > 0 ? (
                    <ul className="space-y-1">
                      {teacher.schedule.thursday.map((time, index) => (
                        <li key={index} className="text-[var(--gray)]">{time}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--gray)]">Không có lịch dạy</p>
                  )}
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Thứ Sáu</h4>
                  {teacher.schedule.friday.length > 0 ? (
                    <ul className="space-y-1">
                      {teacher.schedule.friday.map((time, index) => (
                        <li key={index} className="text-[var(--gray)]">{time}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--gray)]">Không có lịch dạy</p>
                  )}
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Thứ Bảy</h4>
                  {teacher.schedule.saturday.length > 0 ? (
                    <ul className="space-y-1">
                      {teacher.schedule.saturday.map((time, index) => (
                        <li key={index} className="text-[var(--gray)]">{time}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--gray)]">Không có lịch dạy</p>
                  )}
                </div>
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold mb-2">Chủ Nhật</h4>
                  {teacher.schedule.sunday.length > 0 ? (
                    <ul className="space-y-1">
                      {teacher.schedule.sunday.map((time, index) => (
                        <li key={index} className="text-[var(--gray)]">{time}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-[var(--gray)]">Không có lịch dạy</p>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <Link href={`/booking/${teacher.id}`} className="btn btn-primary">
                  Xem Lịch Trống & Đặt Lịch
                </Link>
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Đánh Giá ({teacher.reviews.length})</h3>
                <div className="flex items-center">
                  <div className="text-yellow-400 text-xl mr-2">★★★★★</div>
                  <span className="font-bold text-lg">{teacher.rating}/5</span>
                </div>
              </div>
              
              <div className="space-y-6">
                {teacher.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image 
                          src={review.image} 
                          alt={review.student}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div className="flex flex-wrap justify-between items-center mb-2">
                          <h4 className="font-bold">{review.student}</h4>
                          <span className="text-sm text-[var(--gray)]">{review.date}</span>
                        </div>
                        <div className="text-yellow-400 mb-2">
                          {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                        </div>
                        <p className="text-[var(--gray)]">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button className="btn btn-outline">
                  Xem Tất Cả Đánh Giá
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Quick Booking */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h3 className="text-xl font-bold mb-4">Đặt Lịch Nhanh</h3>
                
                <div className="mb-4">
                  <label htmlFor="quick-subject" className="block font-medium mb-2">Môn Học</label>
                  <select id="quick-subject" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                    {teacher.subjects.map((subject, index) => (
                      <option key={index}>{subject.name} ({subject.price})</option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="quick-date" className="block font-medium mb-2">Ngày</label>
                  <input 
                    type="date" 
                    id="quick-date" 
                    className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none"
                    defaultValue="2025-04-22"
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="quick-time" className="block font-medium mb-2">Thời Gian</label>
                  <select id="quick-time" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                    <option>15:00 - 16:00</option>
                    <option>16:00 - 17:00</option>
                    <option>18:00 - 19:00</option>
                    <option>19:00 - 20:00</option>
                  </select>
                </div>
                
                <Link href={`/booking/${teacher.id}`} className="btn btn-primary w-full">
                  Đặt Lịch Ngay
                </Link>
              </div>
              
              {/* Similar Teachers */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-4">Giáo Viên Tương Tự</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[var(--primary)] transition-colors">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src="https://randomuser.me/api/portraits/men/67.jpg" 
                        alt="Lê Văn C"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold">Lê Văn C</h4>
                      <p className="text-sm text-[var(--gray)]">Toán học | Đại số, Hình học</p>
                      <div className="flex items-center mt-1">
                        <div className="text-yellow-400 text-sm mr-1">★★★★☆</div>
                        <span className="text-xs text-[var(--gray)]">4.7</span>
                      </div>
                    </div>
                    <div className="text-[var(--primary)] font-bold whitespace-nowrap">
                      180K/giờ
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[var(--primary)] transition-colors">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src="https://randomuser.me/api/portraits/women/44.jpg" 
                        alt="Trần Thị B"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold">Trần Thị B</h4>
                      <p className="text-sm text-[var(--gray)]">Toán học | Giải tích, Đại số</p>
                      <div className="flex items-center mt-1">
                        <div className="text-yellow-400 text-sm mr-1">★★★★★</div>
                        <span className="text-xs text-[var(--gray)]">4.8</span>
                      </div>
                    </div>
                    <div className="text-[var(--primary)] font-bold whitespace-nowrap">
                      250K/giờ
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:border-[var(--primary)] transition-colors">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src="https://randomuser.me/api/portraits/men/22.jpg" 
                        alt="Phạm Văn D"
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-bold">Phạm Văn D</h4>
                      <p className="text-sm text-[var(--gray)]">Toán học | Đại số, Hình học</p>
                      <div className="flex items-center mt-1">
                        <div className="text-yellow-400 text-sm mr-1">★★★★☆</div>
                        <span className="text-xs text-[var(--gray)]">4.5</span>
                      </div>
                    </div>
                    <div className="text-[var(--primary)] font-bold whitespace-nowrap">
                      190K/giờ
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Link href="/teachers" className="text-[var(--primary)] font-medium hover:underline">
                    Xem thêm giáo viên →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
