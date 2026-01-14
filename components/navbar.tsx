"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center h-20">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Better Auth Guide
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
