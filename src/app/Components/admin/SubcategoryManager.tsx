"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoTrashOutline, IoCreateOutline, IoSearchOutline } from 'react-icons/io5';
import type { Category, Subcategory, NavbarCategory } from '@/types/shop';
import ImageUpload from '@/app/Components/shared/ImageUpload';

export default function SubcategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([]);
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    categoryId: '',
    navbarCategoryId: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubcategories, setFilteredSubcategories] = useState<Subcategory[]>([]);

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name.length < 2) {
        console.error('Name must be at least 2 characters long');
        return; // Prevent submission
    }

    const subcategoryData = {
      ...formData,
      slug: generateSlug(formData.name),
    };

    try {
      const url = isEditing
        ? `/api/subcategories/${selectedSubcategory?._id}`
        : '/api/subcategories';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subcategoryData),
      });

      if (response.ok) {
        fetchSubcategories();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving subcategory:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: '',
      categoryId: '',
      navbarCategoryId: ''
    });
    setIsEditing(false);
    setSelectedSubcategory(null);
  };

  const fetchNavbarCategories = async () => {
    try {
      const response = await fetch('/api/navbarcategories');
      if (response.ok) {
        const data = await response.json();
        setNavbarCategories(data);
      }
    } catch (error) {
      console.error('Error fetching navbar categories:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched categories:', data);
        setCategories(data);
      } else {
        console.error('Failed to fetch categories:', response.status);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchSubcategories = async () => {
    try {
      const response = await fetch('/api/subcategories');
      if (response.ok) {
        const data = await response.json();
        setSubcategories(data);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
    }
  };

  const handleNavbarCategoryChange = (navbarCategoryId: string) => {
    console.log('Selected navbarCategoryId:', navbarCategoryId);
    console.log('All categories:', categories);
    setFormData(prev => ({ ...prev, navbarCategoryId, categoryId: '' }));
    const filtered = categories.filter(cat => cat.navbarCategoryId === navbarCategoryId);
    console.log('Filtered categories:', filtered);
    setFilteredCategories(filtered);
  };

  const handleEdit = (subcategory: Subcategory) => {
    const category = categories.find(cat => cat._id === subcategory.categoryId);
    
    if (category && category.navbarCategoryId) {
      // First set the navbar category and filter the categories
      const navbarCategoryId = category.navbarCategoryId;
      const filtered = categories.filter(cat => cat.navbarCategoryId === navbarCategoryId);
      setFilteredCategories(filtered);
      
      // Then set the form data with both IDs
      setFormData({
        name: subcategory.name,
        description: subcategory.description || '',
        image: subcategory.image || '',
        categoryId: subcategory.categoryId,
        navbarCategoryId: navbarCategoryId
      });
    } else {
      // Fallback if category or navbarCategoryId is not found
      setFormData({
        name: subcategory.name,
        description: subcategory.description || '',
        image: subcategory.image || '',
        categoryId: subcategory.categoryId,
        navbarCategoryId: ''
      });
      setFilteredCategories([]);
    }
    
    setIsEditing(true);
    setSelectedSubcategory(subcategory);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this subcategory?')) return;

    try {
      const response = await fetch(`/api/subcategories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchSubcategories();
      }
    } catch (error) {
      console.error('Error deleting subcategory:', error);
    }
  };

  useEffect(() => {
    fetchNavbarCategories();
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Filter subcategories based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredSubcategories(subcategories);
    } else {
      const filtered = subcategories.filter(subcategory => {
        const category = categories.find(cat => cat._id === subcategory.categoryId);
        const navbarCategory = category ? navbarCategories.find(nc => nc._id === category.navbarCategoryId) : null;
        
        return (
          subcategory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (subcategory.description && subcategory.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (category && category.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (navbarCategory && navbarCategory.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      setFilteredSubcategories(filtered);
    }
  }, [searchTerm, subcategories, categories, navbarCategories]);

  // Update filtered subcategories when subcategories change
  useEffect(() => {
    setFilteredSubcategories(subcategories);
  }, [subcategories]);

  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  const getNavbarCategoryName = (navbarCategoryId: string) => {
    const navbarCategory = navbarCategories.find(nc => nc._id === navbarCategoryId);
    return navbarCategory ? navbarCategory.name : 'Unknown Navbar Category';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-gray-900">
      {/* Form Section */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
          {isEditing ? 'Edit' : 'Add'} Subcategory
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Navbar Category
            </label>
            <select
              value={formData.navbarCategoryId}
              onChange={(e) => handleNavbarCategoryChange(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select a navbar category</option>
              {navbarCategories.map((navbarCategory) => (
                <option key={navbarCategory._id} value={navbarCategory._id}>
                  {navbarCategory.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Category
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
              required
              disabled={!formData.navbarCategoryId}
            >
              <option value="">Select a category</option>
              {filteredCategories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div>
            <ImageUpload
              key={formData.image}
              value={formData.image}
              onChange={(url: string) => setFormData({ ...formData, image: url })}
              label="Subcategory Image"
            />
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:from-blue-700 hover:to-blue-500 transition-colors"
            >
              {isEditing ? 'Update' : 'Add'} Subcategory
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
            Subcategories
          </h2>
          <span className="text-gray-400">
            Total: {filteredSubcategories.length}
          </span>
        </div>
        
        {/* Search Box */}
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearchOutline className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search subcategories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div className="space-y-4">
          {filteredSubcategories.map((subcategory) => {
            const category = categories.find(cat => cat._id === subcategory.categoryId);
            return (
              <div
                key={subcategory._id}
                className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600"
              >
                <div className="flex items-center space-x-4">
                  {subcategory.image && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image
                        src={subcategory.image}
                        alt={subcategory.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium text-gray-200">{subcategory.name}</h3>
                    <p className="text-sm text-gray-400">
                      {getCategoryName(subcategory.categoryId)} -
                      {category && getNavbarCategoryName(category.navbarCategoryId || '')}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(subcategory)}
                    className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <IoCreateOutline className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(subcategory._id!)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <IoTrashOutline className="w-5 h-5" />
                  </button>
                </div>
              </div>
            );
          })}
          {filteredSubcategories.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              {searchTerm ? 'No subcategories found matching your search' : 'No subcategories found'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}