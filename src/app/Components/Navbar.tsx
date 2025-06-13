"use client"
import { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import logo from '../../../public/navbarlogo/lovosis-logo.png';

interface Product {
  id: string;
  name: string;
  slug: string;
}

interface SubCategory {
  id: string;
  name: string;
  slug: string;
  products: Product[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subCategories: SubCategory[];
}

interface NavbarCategory {
  id: string;
  name: string;
  slug: string;
  categories: Category[];
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedNavbarCategory, setExpandedNavbarCategory] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  // Add mobile product menu state
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [mobileDataLoaded, setMobileDataLoaded] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);

  // Get current path
  const pathname = usePathname();
  
  // Determine active section based on path
  const activeSection = useMemo(() => {
    if (!pathname) return 'home';
    const section = pathname.split('/')[1];
    if (!section) return 'home';
    return section;
  }, [pathname]);

  // Scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Memoized search handler with debouncing
  const debouncedSearch = useMemo(
    () =>
      debounce(async (query: string) => {
        if (query.trim().length === 0) {
          setSearchResults([]);
          setIsSearching(false);
          return;
        }

        setIsSearching(true);
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }
          const data = await response.json();
          console.log('Search results:', data); // Debugging
          setSearchResults(data);
        } catch (error) {
          console.error('Search error:', error);
          setSearchResults([]);
        } finally {
          setIsSearching(false);
        }
      }, 300),
    []
  );

  const handleSearch = useCallback((query: string) => {
    console.log('Search query:', query); // Debugging
    setSearchQuery(query);
    debouncedSearch(query);
  }, [debouncedSearch]);

  // Memoized data fetching with error handling and caching
  const fetchData = useCallback(async () => {
    try {
      const [navbarResponse, categoriesResponse, subcategoriesResponse] = await Promise.all([
        fetch('/api/navbarcategories', { cache: 'force-cache' }),
        fetch('/api/categories', { cache: 'force-cache' }),
        fetch('/api/subcategories', { cache: 'force-cache' })
      ]);

      if (!navbarResponse.ok || !categoriesResponse.ok || !subcategoriesResponse.ok) {
        throw new Error('Failed to fetch data');
      }

      const [navbarData, categoriesData, subcategoriesData] = await Promise.all([
        navbarResponse.json(),
        categoriesResponse.json(),
        subcategoriesResponse.json()
      ]);

      // Format data efficiently
      const formattedData = navbarData.map((navbarCategory: any) => ({
        id: navbarCategory._id || '',
        name: navbarCategory.name || '',
        slug: navbarCategory.slug || '',
        categories: categoriesData
          .filter((category: any) => category.navbarCategoryId === navbarCategory._id)
          .map((category: any) => ({
            id: category._id || '',
            name: category.name || '',
            slug: category.slug || '',
            subCategories: subcategoriesData
              .filter((subcategory: any) => subcategory.categoryId === category._id)
              .map((subcategory: any) => ({
                id: subcategory._id || '',
                name: subcategory.name || '',
                slug: subcategory.slug || '',
                products: []
              }))
          }))
      }));

      setNavbarCategories(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setNavbarCategories([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Memoized click handlers
  const handleNavbarCategoryClick = useCallback((navbarCategoryId: string) => {
    setExpandedNavbarCategory(expandedNavbarCategory === navbarCategoryId ? null : navbarCategoryId);
    setExpandedCategory(null);
  }, [expandedNavbarCategory]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  }, [expandedCategory]);

  const handleLinkClick = useCallback(() => {
    setIsMegaMenuOpen(false);
    setExpandedNavbarCategory(null);
    setExpandedCategory(null);
    setIsOpen(false);
    setIsMobileProductsOpen(false);
  }, []);

  // Lazy load data when mobile menu is opened
  const toggleMobileProducts = useCallback(() => {
    if (!isMobileProductsOpen && !mobileDataLoaded) {
      fetchData().then(() => setMobileDataLoaded(true));
    }
    setIsMobileProductsOpen(!isMobileProductsOpen);
    // Reset expanded states when closing
    if (!isMobileProductsOpen) {
      setExpandedNavbarCategory(null);
      setExpandedCategory(null);
    }
  }, [isMobileProductsOpen, mobileDataLoaded]);

  // Effect hooks
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle click outside to close mega menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const megaMenu = document.getElementById('mega-menu');
      const megaMenuButton = document.getElementById('mega-menu-button');
      const servicesDropdown = document.querySelector('[data-services-dropdown]');

      if (megaMenu && megaMenuButton) {
        if (!megaMenu.contains(event.target as Node) &&
          !megaMenuButton.contains(event.target as Node)) {
          setIsMegaMenuOpen(false);
          setExpandedNavbarCategory(null);
          setExpandedCategory(null);
        }
      }

      if (servicesDropdown && !servicesDropdown.contains(event.target as Node)) {
        setIsServicesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
    if (!isMegaMenuOpen) {
      setExpandedNavbarCategory(null);
      setExpandedCategory(null);
    }
  };

  const toggleSearchBar = useCallback(() => {
    setIsSearchBarVisible(!isSearchBarVisible);
  }, [isSearchBarVisible]);

  return (
    <nav
      className={`bg-white/95 backdrop-blur-md text-gray-900 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-xl border-b border-gray-200' : 'shadow-lg'
      }`}
      suppressHydrationWarning={true}
    >
      {/* Main Navigation - Removed max-w-7xl and mx-auto for full width */}
      <div className="px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-center h-24">
          {/* Logo - Increased size and enhanced styling */}
          <div className="flex-shrink-0 transform hover:scale-105 transition-transform duration-300">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src={logo.src}
                  alt="Lovosis Logo"
                  width={300}
                  height={75}
                  className="object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-300"
                />
                {/* Subtle glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-400/10 to-gray-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
              </div>
            </Link>
          </div>

          {/* Toggler Button - Show below 1084px */}
          <div className="xl:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-300"
            >
              <svg
                className={`h-6 w-6 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop menu items - Hidden below 1084px */}
          <div className="hidden xl:flex items-center space-x-2 flex-1 justify-center">
            <Link
              href="/"
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                activeSection === 'home' 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/25' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md'
              }`}
            >
              Home
            </Link>

            {/* Products Mega Menu Button - Enhanced */}
            <div className="relative">
              <button
                id="mega-menu-button"
                onClick={toggleMegaMenu}
                className={`px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                  activeSection === 'products' 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/25' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md'
                }`}
              >
                Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-300 ${isMegaMenuOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Menu - Enhanced */}
              {isMegaMenuOpen && (
                <div
                  id="mega-menu"
                  className="absolute left-1/2 transform -translate-x-1/2 mt-4 w-[950px] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden z-50 animate-in slide-in-from-top-4 duration-300"
                >
                  <div className="flex">
                    {/* Left sidebar - Enhanced */}
                    <div className="w-72 bg-gradient-to-br from-gray-50 to-gray-100 p-8 border-r border-gray-200/50">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l2 4-2 4M5 7l-2 4 2 4" />
                          </svg>
                        </div>
                        <h3 className="text-gray-900 text-xl font-bold">Product Groups</h3>
                      </div>

                      {loading ? (
                        <div className="flex items-center justify-center h-40">
                          <div className="relative">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-gray-600"></div>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                              <div className="w-3 h-3 bg-gray-600 rounded-full animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      ) : navbarCategories.length > 0 ? (
                        <div className="space-y-1">
                          {navbarCategories.map((navbarCategory, index) => (
                            <div
                              key={navbarCategory.id}
                              className={`group flex items-center justify-between p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
                                expandedNavbarCategory === navbarCategory.id
                                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/25'
                                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:shadow-md'
                              }`}
                              style={{ animationDelay: `${index * 50}ms` }}
                            >
                              <Link
                                href={`/products/${navbarCategory.slug}`}
                                className="text-sm font-semibold cursor-pointer flex-1 flex items-center gap-3"
                                onClick={handleLinkClick}
                              >
                                <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                                  expandedNavbarCategory === navbarCategory.id ? 'bg-white' : 'bg-gray-600'
                                }`}></div>
                                {navbarCategory.name}
                              </Link>
                              <svg
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleNavbarCategoryClick(navbarCategory.id);
                                }}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 cursor-pointer transition-transform duration-300 ${
                                  expandedNavbarCategory === navbarCategory.id ? 'rotate-90' : ''
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-gray-500 text-center py-8">
                          <div className="text-4xl mb-4">📦</div>
                          <p>No categories available</p>
                        </div>
                      )}
                      {/* Add "View All Products" link below the product groups */}
                      <div className="mt-2 text-center">
                        <Link 
                          href="/products"
                          className="text-xs font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
                          onClick={handleLinkClick}
                        >
                          View All Products →
                        </Link>
                      </div>
                    </div>

                    {/* Right content area - Enhanced */}
                    <div className="flex-1 p-8">
                      {expandedNavbarCategory ? (
                        <div className="grid grid-cols-2 gap-8">
                          {/* Categories */}
                          <div>
                            <div className="flex items-center gap-3 mb-6">
                              <div className="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                              </div>
                              <h3 className="text-gray-900 text-lg font-bold">Categories</h3>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              {navbarCategories
                                .find(nc => nc.id === expandedNavbarCategory)
                                ?.categories.map((category, index) => (
                                  <div
                                    key={category.id}
                                    className={`p-4 rounded-xl transition-all duration-300 hover:scale-105 animate-in slide-in-from-left-1 ${
                                      expandedCategory === category.id
                                        ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white shadow-lg shadow-gray-400/25'
                                        : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 hover:shadow-md'
                                    }`}
                                    style={{ animationDelay: `${index * 75}ms` }}
                                  >
                                    <div className="flex items-center justify-between">
                                      <Link
                                        href={`/products/${navbarCategories.find(nc => nc.id === expandedNavbarCategory)?.slug}/${category.slug}`}
                                        className="text-sm font-semibold cursor-pointer flex-1 flex items-center gap-3"
                                        onClick={handleLinkClick}
                                      >
                                        <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                                          expandedCategory === category.id ? 'bg-white' : 'bg-gray-600'
                                        }`}></div>
                                        {category.name}
                                      </Link>
                                      <svg
                                        onClick={(e) => {
                                          e.preventDefault();
                                          handleCategoryClick(category.id);
                                        }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        className={`h-4 w-4 cursor-pointer transition-transform duration-300 ${
                                          expandedCategory === category.id ? 'rotate-90' : ''
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                      </svg>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </div>

                          {/* Subcategories */}
                          <div>
                            {expandedCategory && (
                              <>
                                <div className="flex items-center gap-3 mb-6">
                                  <div className="w-6 h-6 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4l2 4-2 4M5 7l-2 4 2 4" />
                                    </svg>
                                  </div>
                                  <h3 className="text-gray-900 text-lg font-bold">Sub Categories</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                  {navbarCategories
                                    .find(nc => nc.id === expandedNavbarCategory)
                                    ?.categories
                                    .find(c => c.id === expandedCategory)
                                    ?.subCategories.map((subCategory, index) => (
                                      <div
                                        key={subCategory.id}
                                        className="p-4 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 hover:shadow-md flex items-center justify-between transition-all duration-300 hover:scale-105 animate-in slide-in-from-right-1"
                                        style={{ animationDelay: `${index * 75}ms` }}
                                      >
                                        <Link
                                          href={`/products/${navbarCategories.find(nc => nc.id === expandedNavbarCategory)?.slug
                                            }/${navbarCategories
                                              .find(nc => nc.id === expandedNavbarCategory)
                                              ?.categories.find(c => c.id === expandedCategory)?.slug
                                            }/${subCategory.slug}`}
                                          className="flex-1 flex items-center gap-3"
                                          onClick={handleLinkClick}
                                        >
                                          <div className="w-1.5 h-1.5 bg-gray-600 rounded-full"></div>
                                          <span className="text-sm font-medium">{subCategory.name}</span>
                                        </Link>
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-4 w-4 cursor-pointer text-gray-400 hover:text-gray-700 transition-colors duration-200"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                          onClick={() => {
                                            setIsMegaMenuOpen(false);
                                            setExpandedNavbarCategory(null);
                                            setExpandedCategory(null);
                                          }}
                                        >
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                      </div>
                                    ))}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="h-80 flex items-center justify-center">
                          <div className="text-center">
                            <div className="relative mb-6">
                              <div className="text-6xl text-gray-300 animate-bounce">🔍</div>
                              <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-gray-600/20 rounded-full blur-2xl"></div>
                            </div>
                            <h3 className="text-gray-900 text-2xl font-bold mb-3">Explore Our Products</h3>
                            <p className="text-gray-500 text-base max-w-md leading-relaxed">
                              Select a product group from the left to browse our extensive catalog of premium products.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Services Dropdown - Enhanced */}
            <div className="relative" data-services-dropdown>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className={`px-6 py-3 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 hover:scale-105 ${
                  activeSection === 'services' 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/25' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md'
                }`}
              >
                Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transition-transform duration-300 ${isServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Services Dropdown Menu - Enhanced */}
              {isServicesOpen && (
                <div className="absolute left-0 mt-2 w-64 bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200/50 py-3 z-50 transform transition-all duration-300 animate-in slide-in-from-top-2">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-600 uppercase tracking-wider border-b border-gray-100 mb-2">
                    Our Services
                  </div>
                  <Link
                    href="/services/electronics-manufacturing"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 transition-all duration-200 group"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">Electronics Manufacturing</div>
                      <div className="text-xs text-gray-500">PCB & Component Assembly</div>
                    </div>
                  </Link>
                  <Link
                    href="/services/it-services"
                    className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 transition-all duration-200 group"
                    onClick={() => setIsServicesOpen(false)}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                      <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-medium">IT Services</div>
                      <div className="text-xs text-gray-500">Software & Support Solutions</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105 ${
                activeSection === 'about' 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/25' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md'
              }`}
            >
              About
            </Link>

            {['Certificates'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 ${
                  activeSection === item.toLowerCase() 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg shadow-gray-500/25' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-md'
                }`}
                prefetch={true}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Desktop Search Toggle and Contact Button */}
          <div className="hidden xl:flex items-center space-x-4">
            <button
              onClick={toggleSearchBar}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-full transition-all duration-300 hover:scale-110"
              title="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <Link
              href="/contact"
              className="px-8 py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm font-semibold rounded-full hover:shadow-xl hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105 transform"
            >
              Contact Us
            </Link>
          </div>
        </div>
{/* Desktop Search Bar - Enhanced */}
{isSearchBarVisible && (
          <div className="px-4 pb-6 animate-in slide-in-from-top-2 duration-300">
            <div className="relative max-w-3xl mx-auto">
              {/* Search Container with Gradient Border */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50">
                  {/* Search Input */}
                  <div className="flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none z-10">
                      <div className="relative">
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-gray-600/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Search for products, categories, or brands..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-16 pr-16 py-5 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none text-lg font-medium tracking-wide"
                      style={{ fontSize: '16px' }}
                    />
                    {/* Loading Spinner */}
                    {isSearching && (
                      <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-6 w-6 border-2 border-gray-300 border-t-gray-600"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-gray-600/20 rounded-full blur-lg"></div>
                        </div>
                      </div>
                    )}
                    {/* Clear Button */}
                    {searchQuery && !isSearching && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="absolute inset-y-0 right-0 pr-6 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* Enhanced Search Results */}
              {searchResults.length > 0 && searchQuery && (
                <div className="absolute w-full mt-3 z-50 animate-in slide-in-from-top-4 duration-300">
                  <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    {/* Results Header */}
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Search Results ({searchResults.length})
                        </h3>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSearchResults([]);
                            setIsSearchBarVisible(false);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* Results List */}
                    <div className="max-h-96 overflow-y-auto custom-scrollbar">
                      {searchResults.map((result, index) => (
                        <Link
                          key={index}
                          href={result.url || '#'}
                          className="group flex items-center px-6 py-4 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setSearchQuery('');
                            setSearchResults([]);
                            setIsSearchBarVisible(false);
                          }}
                        >
                          <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 group-hover:text-gray-800 transition-colors duration-200 truncate">
                              {result.title || 'Untitled'}
                            </div>
                            <div className="text-sm text-gray-500 mt-1 flex items-center">
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium mr-2">
                                {result.type || 'Product'}
                              </span>
                              <span className="truncate">
                                {result.description || 'No description available'}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {/* View All Results */}
                    <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50">
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 flex items-center justify-center gap-2"
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                          setIsSearchBarVisible(false);
                        }}
                      >
                        View all results for "{searchQuery}"
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {/* No Results Message */}
              {searchQuery && !isSearching && searchResults.length === 0 && (
                <div className="absolute w-full mt-3 z-50 animate-in slide-in-from-top-4 duration-300">
                  <div className="bg-white/98 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200/50 p-8 text-center">
                    <div className="text-4xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find anything matching "{searchQuery}". Try different keywords.
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200"
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu - Enhanced hierarchical navigation */}
      {isOpen && (
        <div className="xl:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200 animate-in slide-in-from-top-4 duration-300">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* Home */}
            <Link
              href="/"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                activeSection === 'home' 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleLinkClick}
            >
              Home
            </Link>

            {/* Products - Hierarchical Mobile Menu */}
            <div>
              <button
                onClick={toggleMobileProducts}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                  activeSection === 'products' 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Products
                <svg
                  className={`h-5 w-5 transition-transform duration-300 ${isMobileProductsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mobile Products Menu */}
              {isMobileProductsOpen && (
                <div className="mt-2 space-y-1 animate-in slide-in-from-top-2 duration-300">
                  {loading ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-gray-600"></div>
                    </div>
                  ) : navbarCategories.length > 0 ? (
                    navbarCategories.map((navbarCategory) => (
                      <div key={navbarCategory.id} className="ml-4">
                        {/* Navbar Category */}
                        <div className="flex items-center justify-between">
                          <Link
                            href={`/products/${navbarCategory.slug}`}
                            className="flex-1 flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                            onClick={handleLinkClick}
                          >
                            <div className="w-2 h-2 bg-gray-500 rounded-full mr-3"></div>
                            {navbarCategory.name}
                          </Link>
                          <button
                            onClick={() => handleNavbarCategoryClick(navbarCategory.id)}
                            className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <svg
                              className={`h-4 w-4 transition-transform duration-300 ${
                                expandedNavbarCategory === navbarCategory.id ? 'rotate-90' : ''
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>

                        {/* Categories */}
                        {expandedNavbarCategory === navbarCategory.id && (
                          <div className="mt-1 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                            {navbarCategory.categories.map((category) => (
                              <div key={category.id}>
                                {/* Category */}
                                <div className="flex items-center justify-between">
                                  <Link
                                    href={`/products/${navbarCategory.slug}/${category.slug}`}
                                    className="flex-1 flex items-center px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                    onClick={handleLinkClick}
                                  >
                                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                                    {category.name}
                                  </Link>
                                  <button
                                    onClick={() => handleCategoryClick(category.id)}
                                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                  >
                                    <svg
                                      className={`h-4 w-4 transition-transform duration-300 ${
                                        expandedCategory === category.id ? 'rotate-90' : ''
                                      }`}
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </button>
                                </div>

                                {/* Subcategories */}
                                {expandedCategory === category.id && (
                                  <div className="mt-1 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                                    {category.subCategories.map((subCategory) => (
                                      <Link
                                        key={subCategory.id}
                                        href={`/products/${navbarCategory.slug}/${category.slug}/${subCategory.slug}`}
                                        className="flex items-center px-3 py-2 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200"
                                        onClick={handleLinkClick}
                                      >
                                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-3"></div>
                                        {subCategory.name}
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500">
                      <p>No categories available</p>
                    </div>
                  )}
                  {/* Add "View All Products" link for mobile and tablet views */}
                  <div className="mt-2 text-center">
                  <Link
                      href="/products"
                      className="text-xs font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200"
                      onClick={handleLinkClick}
                    >
                      View All Products →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Services */}
            <div>
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                  activeSection === 'services' 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Services
                <svg
                  className={`h-5 w-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Services Submenu */}
              {isMobileServicesOpen && (
                <div className="mt-2 ml-4 space-y-1 animate-in slide-in-from-top-2 duration-300">
                  <Link
                    href="/services/electronics-manufacturing"
                    className="flex items-center px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    onClick={() => {
                      handleLinkClick();
                      setIsMobileServicesOpen(false);
                    }}
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    Electronics Manufacturing
                  </Link>
                  <Link
                    href="/services/it-services"
                    className="flex items-center px-4 py-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-all duration-200"
                    onClick={() => {
                      handleLinkClick();
                      setIsMobileServicesOpen(false);
                    }}
                  >
                    <div className="w-2 h-2 bg-gray-400 rounded-full mr-3"></div>
                    IT Services
                  </Link>
                </div>
              )}
            </div>

            {/* About */}
            <Link
              href="/about"
              className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                activeSection === 'about' 
                  ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
              onClick={handleLinkClick}
            >
              About
            </Link>

            {/* Other Links */}
            {['Certificates'].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 ${
                  activeSection === item.toLowerCase() 
                    ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
                onClick={handleLinkClick}
              >
                {item}
              </Link>
            ))}

            {/* Contact */}
            <Link
              href="/contact"
              className="block px-4 py-3 mt-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-base font-semibold rounded-xl text-center transition-all duration-300 hover:shadow-lg"
              onClick={handleLinkClick}
            >
              Contact Us
            </Link>

            {/* Mobile Search Bar - Enhanced */}
            <div className="relative mt-4">
              {/* Mobile Search Container with Enhanced Design */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-500 rounded-2xl blur opacity-15 group-hover:opacity-30 transition duration-500"></div>
                <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50">
                  {/* Search Input */}
                  <div className="flex items-center">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                      <div className="relative">
                        <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-gray-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    </div>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full pl-12 pr-12 py-4 bg-transparent text-gray-900 placeholder-gray-500 focus:outline-none font-medium"
                      style={{ fontSize: '16px' }}
                    />
                    {/* Loading Spinner */}
                    {isSearching && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-gray-600"></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-gray-400/20 to-gray-600/20 rounded-full blur-md"></div>
                        </div>
                      </div>
                    )}
                    {/* Clear Button */}
                    {searchQuery && !isSearching && (
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
              {/* Enhanced Mobile Search Results */}
              {searchResults.length > 0 && searchQuery && (
                <div className="absolute w-full mt-2 z-50 animate-in slide-in-from-top-4 duration-300">
                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
                    {/* Results Header */}
                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/50">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-gray-900">
                          Results ({searchResults.length})
                        </h3>
                        <button
                          onClick={() => {
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    {/* Results List */}
                    <div className="max-h-80 overflow-y-auto">
                      {searchResults.map((result, index) => (
                        <Link
                          key={index}
                          href={result.url || '#'}
                          className="group flex items-center px-4 py-3 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-200 border-b border-gray-100 last:border-b-0"
                          onClick={() => {
                            setSearchQuery('');
                            setSearchResults([]);
                          }}
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 group-hover:text-gray-800 transition-colors duration-200 truncate text-sm">
                              {result.title || 'Untitled'}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium mr-2">
                                {result.type || 'Product'}
                              </span>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-2">
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {/* View All Results */}
                    <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200/50">
                      <Link
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 flex items-center justify-center gap-2"
                        onClick={() => {
                          setSearchQuery('');
                          setSearchResults([]);
                        }}
                      >
                        View all results
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              {/* No Results Message for Mobile */}
              {searchQuery && !isSearching && searchResults.length === 0 && (
                <div className="absolute w-full mt-2 z-50 animate-in slide-in-from-top-4 duration-300">
                  <div className="bg-white/98 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 p-6 text-center">
                    <div className="text-3xl mb-3">🔍</div>
                    <h3 className="text-base font-semibold text-gray-900 mb-2">No results found</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Try different keywords or browse our categories.
                    </p>
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full text-sm font-medium hover:shadow-lg transition-all duration-200"
                    >
                      Clear search
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;