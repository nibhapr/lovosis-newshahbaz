"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HiOutlineHome,
  HiOutlineEnvelope,
  HiOutlineBars3,
  HiOutlineXMark,
  HiOutlineNewspaper,
  HiOutlineSquares2X2,
  HiOutlineRectangleStack,
  HiOutlineShoppingBag,
  HiOutlineStar,
  HiOutlineArrowRightOnRectangle,
  HiOutlinePhoto,
} from 'react-icons/hi2';

const menuItems = [
  { name: 'Dashboard', icon: HiOutlineHome, path: '/admin/dashboard' },
  { name: 'Contacts', icon: HiOutlineEnvelope, path: '/admin/dashboard/contacts' },
  { name: 'Newsletter', icon: HiOutlineNewspaper, path: '/admin/dashboard/newsletter' },
  { name: 'Navbar Category', icon: HiOutlineSquares2X2, path: '/admin/dashboard/navbarcategories' },
  { name: 'Categories', icon: HiOutlineSquares2X2, path: '/admin/dashboard/categories' },
  { name: 'Subcategories', icon: HiOutlineRectangleStack, path: '/admin/dashboard/subcategories' },
  { name: 'Products', icon: HiOutlineShoppingBag, path: '/admin/dashboard/products' },
  { name: 'Catalog Requests', icon: HiOutlineRectangleStack, path: '/admin/dashboard/catalog-requests' },
  { name: 'Reviews', icon: HiOutlineStar, path: '/admin/dashboard/reviews' },
  { name: 'Gallery', icon: HiOutlinePhoto, path: '/admin/dashboard/gallery' },
  { name: 'Certificates', icon: HiOutlinePhoto, path: '/admin/dashboard/certificates' },
];

interface SidebarProps {
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export default function Sidebar({ isCollapsed, onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        router.push('/auth/login');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div
      className={`
        ${isCollapsed ? 'w-20' : 'w-72'} 
        h-screen 
        bg-gradient-to-b from-gray-950 to-gray-900
        text-white
        transition-all duration-300 ease-in-out 
        flex flex-col 
        justify-between 
        shadow-xl
        relative
        overflow-y-auto
      `}
    >
      <div>
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h1 className={`font-bold text-xl bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent ${isCollapsed ? 'hidden' : 'block'}`}>
            Lovosis Admin
          </h1>
          <button
            onClick={() => onCollapse(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
          >
            {isCollapsed ? <HiOutlineBars3 size={24} /> : <HiOutlineXMark size={24} />}
          </button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className={`
                    flex items-center gap-4 p-3 rounded-xl
                    transition-all duration-200
                    ${pathname === item.path
                      ? 'bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-lg shadow-blue-500/20'
                      : 'hover:bg-gray-800/50 text-gray-400 hover:text-white'
                    }
                  `}
                >
                  <item.icon size={24} />
                  <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium`}>
                    {item.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleLogout}
          className={`
            flex items-center gap-4 p-3 rounded-xl w-full
            text-red-400 hover:text-red-300
            hover:bg-gray-800/50
            transition-all duration-200
          `}
        >
          <HiOutlineArrowRightOnRectangle size={24} />
          <span className={`${isCollapsed ? 'hidden' : 'block'} font-medium`}>
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}