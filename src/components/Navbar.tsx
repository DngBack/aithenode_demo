import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container">
        <nav className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
            Edu<span className="text-[var(--accent)]">Connect</span>
          </Link>
          <div className="hidden md:flex gap-8">
            <Link href="/teachers" className="text-[var(--dark)] font-medium hover:text-[var(--primary)] transition-colors">
              Tìm Giáo Viên
            </Link>
            <Link href="/group-classes" className="text-[var(--dark)] font-medium hover:text-[var(--primary)] transition-colors">
              Lớp Học Nhóm
            </Link>
            <Link href="/community" className="text-[var(--dark)] font-medium hover:text-[var(--primary)] transition-colors">
              Cộng Đồng
            </Link>
            <Link href="/become-teacher" className="text-[var(--dark)] font-medium hover:text-[var(--primary)] transition-colors">
              Trở Thành Giáo Viên
            </Link>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="btn btn-outline">
              Đăng Nhập
            </Link>
            <Link href="/register" className="btn btn-primary">
              Đăng Ký
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
