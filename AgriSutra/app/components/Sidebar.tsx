'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { X, Settings, HelpCircle, LogOut, Sprout } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UserProfile {
  name: string;
  username: string;
  email: string;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3001/userProfile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    if (isOpen) {
      fetchUserProfile();
    }
  }, [isOpen]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <Sprout className="h-8 w-8 text-green-600" />
            <span className="ml-2 text-xl font-bold text-green-800">AgriSutra</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {user && (
          <div className="mb-8">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center">
                <span className="text-xl text-white font-semibold">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <div className="font-semibold text-gray-900">{user.username}</div>
                <div className="text-sm text-gray-500">{user.email}</div>
              </div>
            </div>
          </div>
        )}

        <nav className="space-y-2">
          <Link
            href="/schemes"
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md"
          >
            <span>Know Your Schemes</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
          <Link
            href="/support"
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md"
          >
            <HelpCircle className="h-5 w-5" />
            <span>Support</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md w-full text-left"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
    </div>
  );
}