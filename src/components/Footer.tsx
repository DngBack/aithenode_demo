import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[var(--dark)] text-white py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-5">EduConnect</h3>
            <p className="mb-5">Nền tảng kết nối học viên với giáo viên chuyên môn trong nhiều lĩnh vực khác nhau.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white text-xl hover:text-[var(--accent)] transition-colors">📱</a>
              <a href="#" className="text-white text-xl hover:text-[var(--accent)] transition-colors">📘</a>
              <a href="#" className="text-white text-xl hover:text-[var(--accent)] transition-colors">📸</a>
              <a href="#" className="text-white text-xl hover:text-[var(--accent)] transition-colors">📺</a>
            </div>
          </div>
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-5">Dành Cho Học Viên</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Cách Bắt Đầu</Link></li>
              <li><Link href="/teachers" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Tìm Giáo Viên</Link></li>
              <li><Link href="/group-classes" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Lớp Học Nhóm</Link></li>
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Thanh Toán</Link></li>
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Hỗ Trợ Học Viên</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-5">Dành Cho Giáo Viên</h3>
            <ul className="space-y-3">
              <li><Link href="/become-teacher" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Trở Thành Giáo Viên</Link></li>
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Cách Thức Hoạt Động</Link></li>
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Phí và Thanh Toán</Link></li>
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Tạo Lớp Học Nhóm</Link></li>
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Hỗ Trợ Giáo Viên</Link></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3 className="text-lg font-semibold mb-5">Về Chúng Tôi</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Giới Thiệu</Link></li>
              <li><Link href="/community" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Cộng Đồng</Link></li>
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Blog</Link></li>
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Tuyển Dụng</Link></li>
              <li><Link href="#" className="text-[var(--gray-light)] hover:text-[var(--accent)] transition-colors">Liên Hệ</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center pt-5 border-t border-gray-800 text-[var(--gray-light)] text-sm">
          <p>&copy; 2025 EduConnect. Tất cả quyền được bảo lưu.</p>
        </div>
      </div>
    </footer>
  );
}
