"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoChevronForward } from 'react-icons/io5';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);

  return (
    <nav className="bg-white py-2 sm:py-3 px-3 sm:px-4 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <ol className="flex flex-wrap items-center gap-1 sm:gap-2">
          <li>
            <Link
              href="/"
              className="text-sm sm:text-base text-gray-600 hover:text-blue-600 transition-colors"
            >
              Home
            </Link>
          </li>
          {paths.map((path, index) => (
            <li key={`${path}-${index}`} className="flex items-center gap-1 sm:gap-2">
              <IoChevronForward className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              <Link
                href={`/${paths.slice(0, index + 1).join('/')}`}
                className={`text-sm sm:text-base capitalize break-words ${
                  index === paths.length - 1
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-blue-600'
                } transition-colors`}
              >
                {path.replace(/-/g, ' ')}
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}