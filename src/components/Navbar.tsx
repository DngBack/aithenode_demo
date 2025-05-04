'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { LayoutDashboard } from 'lucide-react';

interface User {
  id: string;
  name: string;
  role: 'student' | 'teacher';
}

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check if current page is an auth page
  const isAuthPage = pathname === '/signin' || pathname === '/signup';

  useEffect(() => {
    const checkUser = () => {
      const userStr = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userStr && token) {
        try {
          const userData = JSON.parse(userStr);
          setUser(userData);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setIsLoading(false);
    };

    // Check user on mount
    checkUser();

    // Add event listener for storage changes
    window.addEventListener('storage', checkUser);
    
    // Add event listener for custom event
    window.addEventListener('authStateChange', checkUser);
    
    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('authStateChange', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    // Dispatch custom event
    window.dispatchEvent(new Event('authStateChange'));
    router.push('/signin');
  };

  // If on auth page, show simplified navbar
  if (isAuthPage) {
    return (
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="container">
          <nav className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
              Edu<span className="text-[var(--accent)]">Connect</span>
            </Link>
          </nav>
        </div>
      </header>
    );
  }

  // Don't render anything while checking authentication status
  if (isLoading) {
    return null;
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container">
        <nav className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-2xl font-bold text-[var(--primary)]">
              Edu<span className="text-[var(--accent)]">Connect</span>
            </Link>
            {user && (
              <div className="flex items-center space-x-4">
                <Link 
                  href={`/${user.role}/${user.id}/dashboard`}
                  className="flex items-center space-x-2 text-gray-600 hover:text-[var(--primary)] transition-colors"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </div>
            )}
          </div>
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
            {!user && (
              <Link href="/become-teacher" className="text-[var(--dark)] font-medium hover:text-[var(--primary)] transition-colors">
                Trở Thành Giáo Viên
              </Link>
            )}
          </div>
          <div className="flex gap-4 items-center">
            {user ? (
              <>
                <Link 
                  href={`/${user.role}/${user.id}`} 
                  className="text-[var(--dark)] font-medium hover:text-[var(--primary)] transition-colors"
                >
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn btn-outline"
                >
                  Đăng Xuất
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="btn btn-outline">
                  Đăng Nhập
                </Link>
                <Link href="/signup" className="btn btn-primary">
                  Đăng Ký
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
