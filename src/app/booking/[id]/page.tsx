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

export default function BookingPage() {
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
    subjects: [
      { name: 'Đại Số', price: '200.000 VND/giờ' },
      { name: 'Giải Tích', price: '220.000 VND/giờ' },
      { name: 'Hình Học', price: '200.000 VND/giờ' }
    ]
  };

  return (
    <>
      {/* Header Section */}
      <section className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Đặt Lịch Học</h1>
          <p className="text-xl max-w-2xl">Hoàn tất đặt lịch học với giáo viên bạn đã chọn</p>
        </div>
      </section>

      {/* Steps Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div className="flex flex-col items-center mb-6 md:mb-0 relative w-full md:w-1/4">
            <div className="w-12 h-12 bg-[var(--success)] text-white rounded-full flex items-center justify-center text-lg font-bold mb-2">
              1
            </div>
            <div className="text-[var(--success)] font-bold">Chọn Giáo Viên</div>
            <div className="hidden md:block absolute h-1 bg-[var(--success)] top-6 left-1/2 w-full"></div>
          </div>
          <div className="flex flex-col items-center mb-6 md:mb-0 relative w-full md:w-1/4">
            <div className="w-12 h-12 bg-[var(--primary)] text-white rounded-full flex items-center justify-center text-lg font-bold mb-2">
              2
            </div>
            <div className="text-[var(--primary)] font-bold">Đặt Lịch</div>
            <div className="hidden md:block absolute h-1 bg-[var(--gray-light)] top-6 left-1/2 w-full"></div>
          </div>
          <div className="flex flex-col items-center mb-6 md:mb-0 relative w-full md:w-1/4">
            <div className="w-12 h-12 bg-[var(--light)] text-[var(--gray)] border-2 border-[var(--gray-light)] rounded-full flex items-center justify-center text-lg font-bold mb-2">
              3
            </div>
            <div className="text-[var(--gray)]">Thanh Toán</div>
            <div className="hidden md:block absolute h-1 bg-[var(--gray-light)] top-6 left-1/2 w-full"></div>
          </div>
          <div className="flex flex-col items-center relative w-full md:w-1/4">
            <div className="w-12 h-12 bg-[var(--light)] text-[var(--gray)] border-2 border-[var(--gray-light)] rounded-full flex items-center justify-center text-lg font-bold mb-2">
              4
            </div>
            <div className="text-[var(--gray)]">Xác Nhận</div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h2 className="text-2xl font-bold mb-6 pb-4 border-b border-gray-200">Thông Tin Buổi Học</h2>
              
              {/* Teacher Info */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <Image 
                    src={teacher.image} 
                    alt={teacher.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{teacher.name}</h3>
                  <div className="text-sm bg-[var(--primary)] text-white px-2 py-0.5 rounded inline-block mb-1">
                    {teacher.badge}
                  </div>
                  <div className="text-[var(--gray)] text-sm">{teacher.subject}</div>
                  <div className="flex items-center mt-1">
                    <div className="text-yellow-400 mr-1">★★★★★</div>
                    <span className="text-sm text-[var(--gray)]">{teacher.rating} ({teacher.reviewCount} đánh giá)</span>
                  </div>
                </div>
              </div>

              {/* Subject Selection */}
              <div className="mb-6">
                <label htmlFor="subject" className="block font-medium mb-2">Chọn Môn Học</label>
                <select id="subject" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                  {teacher.subjects.map((subject, index) => (
                    <option key={index}>{subject.name} ({subject.price})</option>
                  ))}
                </select>
              </div>

              {/* Calendar */}
              <div className="mb-6">
                <label className="block font-medium mb-2">Chọn Ngày</label>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="font-medium">Tháng 4, 2025</div>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 flex items-center justify-center bg-[var(--light)] rounded-full hover:bg-gray-200">
                        ←
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center bg-[var(--light)] rounded-full hover:bg-gray-200">
                        →
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    <div className="text-sm font-bold text-[var(--gray)]">CN</div>
                    <div className="text-sm font-bold text-[var(--gray)]">T2</div>
                    <div className="text-sm font-bold text-[var(--gray)]">T3</div>
                    <div className="text-sm font-bold text-[var(--gray)]">T4</div>
                    <div className="text-sm font-bold text-[var(--gray)]">T5</div>
                    <div className="text-sm font-bold text-[var(--gray)]">T6</div>
                    <div className="text-sm font-bold text-[var(--gray)]">T7</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    <div className="p-2 text-center text-gray-400">30</div>
                    <div className="p-2 text-center text-gray-400">31</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">1</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">2</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">3</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">4</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">5</div>
                    
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">6</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">7</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">8</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">9</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">10</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">11</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">12</div>
                    
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">13</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">14</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">15</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">16</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">17</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">18</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">19</div>
                    
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">20</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">21</div>
                    <div className="p-2 text-center bg-[var(--primary)] text-white rounded cursor-pointer">22</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">23</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">24</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">25</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">26</div>
                    
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">27</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">28</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">29</div>
                    <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">30</div>
                    <div className="p-2 text-center text-gray-400">1</div>
                    <div className="p-2 text-center text-gray-400">2</div>
                    <div className="p-2 text-center text-gray-400">3</div>
                  </div>
                </div>
              </div>

              {/* Time Slots */}
              <div className="mb-6">
                <label className="block font-medium mb-2">Chọn Thời Gian (22/04/2025)</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
                  <div className="p-2 text-center text-gray-400 bg-[var(--light)] rounded opacity-50 cursor-not-allowed">08:00</div>
                  <div className="p-2 text-center text-gray-400 bg-[var(--light)] rounded opacity-50 cursor-not-allowed">09:00</div>
                  <div className="p-2 text-center text-gray-400 bg-[var(--light)] rounded opacity-50 cursor-not-allowed">10:00</div>
                  <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">11:00</div>
                  <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">14:00</div>
                  <div className="p-2 text-center bg-[var(--primary)] text-white rounded cursor-pointer">15:00</div>
                  <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">16:00</div>
                  <div className="p-2 text-center text-gray-400 bg-[var(--light)] rounded opacity-50 cursor-not-allowed">17:00</div>
                  <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">18:00</div>
                  <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">19:00</div>
                  <div className="p-2 text-center bg-[var(--light)] rounded cursor-pointer hover:bg-gray-200">20:00</div>
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <label htmlFor="duration" className="block font-medium mb-2">Thời Lượng</label>
                <select id="duration" className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none">
                  <option>1 giờ</option>
                  <option>1.5 giờ</option>
                  <option>2 giờ</option>
                </select>
              </div>

              {/* Note */}
              <div className="mb-6">
                <label htmlFor="note" className="block font-medium mb-2">Ghi Chú (Tùy Chọn)</label>
                <textarea 
                  id="note" 
                  rows={4} 
                  className="w-full p-3 border border-gray-300 rounded-md focus:border-[var(--primary)] outline-none"
                  placeholder="Nhập yêu cầu hoặc thông tin bổ sung cho giáo viên..."
                ></textarea>
              </div>

              <button className="btn btn-primary w-full">Tiếp Tục Đến Thanh Toán</button>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-200">Tóm Tắt Đặt Lịch</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <div className="text-[var(--gray)]">Giáo viên</div>
                    <div className="font-medium">{teacher.name}</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[var(--gray)]">Môn học</div>
                    <div className="font-medium">Đại Số</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[var(--gray)]">Ngày</div>
                    <div className="font-medium">22/04/2025</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[var(--gray)]">Thời gian</div>
                    <div className="font-medium">15:00 - 16:00</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[var(--gray)]">Thời lượng</div>
                    <div className="font-medium">1 giờ</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-[var(--gray)]">Giá/giờ</div>
                    <div className="font-medium">200.000 VND</div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4 border-t border-gray-200 text-lg font-bold">
                  <div>Tổng cộng</div>
                  <div className="text-[var(--primary)]">200.000 VND</div>
                </div>

                {/* Payment Methods */}
                <div className="mt-8">
                  <h3 className="font-bold mb-4">Phương Thức Thanh Toán</h3>
                  <div className="space-y-3">
                    <label className="flex items-center p-3 border border-[var(--primary)] bg-blue-50 rounded-md cursor-pointer">
                      <input type="radio" name="payment" className="mr-3" defaultChecked />
                      <span className="mr-3 text-xl">💳</span>
                      <span className="font-medium">Thẻ Tín Dụng / Ghi Nợ</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:border-[var(--primary)] hover:bg-blue-50">
                      <input type="radio" name="payment" className="mr-3" />
                      <span className="mr-3 text-xl">🏦</span>
                      <span className="font-medium">Chuyển Khoản Ngân Hàng</span>
                    </label>
                    <label className="flex items-center p-3 border border-gray-200 rounded-md cursor-pointer hover:border-[var(--primary)] hover:bg-blue-50">
                      <input type="radio" name="payment" className="mr-3" />
                      <span className="mr-3 text-xl">📱</span>
                      <span className="font-medium">Ví Điện Tử (Momo, ZaloPay)</span>
                    </label>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2 mt-6">
                  <input type="checkbox" id="terms" className="mt-1" />
                  <label htmlFor="terms" className="text-sm text-[var(--gray)]">
                    Tôi đồng ý với <Link href="#" className="text-[var(--primary)] hover:underline">Điều khoản dịch vụ</Link> và <Link href="#" className="text-[var(--primary)] hover:underline">Chính sách hủy buổi học</Link> của EduConnect
                  </label>
                </div>

                <button className="btn btn-primary w-full mt-6 py-3 text-lg font-bold">Thanh Toán</button>
                
                <div className="flex justify-center items-center gap-1 mt-4 text-sm text-[var(--gray)]">
                  <span className="text-[var(--success)]">🔒</span> Thanh toán an toàn và bảo mật
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
