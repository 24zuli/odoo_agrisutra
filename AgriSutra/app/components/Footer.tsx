'use client';

import Link from 'next/link';
import { Home, Newspaper, Cloud, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-3">
          <Link
            href="/"
            className="flex flex-col items-center text-gray-600 hover:text-green-600"
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link
            href="/news"
            className="flex flex-col items-center text-gray-600 hover:text-green-600"
          >
            <Newspaper className="h-6 w-6" />
            <span className="text-xs mt-1">News</span>
          </Link>
          <Link
            href="/weather"
            className="flex flex-col items-center text-gray-600 hover:text-green-600"
          >
            <Cloud className="h-6 w-6" />
            <span className="text-xs mt-1">Weather</span>
          </Link>
          <Link
            href="/profile"
            className="flex flex-col items-center text-gray-600 hover:text-green-600"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}