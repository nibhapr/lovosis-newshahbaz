"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoTrashOutline, IoCreateOutline, IoSearchOutline } from 'react-icons/io5';
import type { Category, NavbarCategory } from '@/types/shop';
import ImageUpload from '@/app/Components/shared/ImageUpload';

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    navbarCategoryId: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.navbarCategoryId) {
      setError('Please select a Navbar Category');
      return;
    }

    const categoryData = {
      ...formData,
      slug: generateSlug(formData.name),
    };

    console.log('Submitting category data:', categoryData);

    try {
      const url = isEditing
        ? `/api/categories/${selectedCategory?._id}`
        : '/api/categories';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });

      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        setError(data.error || 'Failed to save category');
        return;
      }

      fetchCategories();
      resetForm();
    } catch (error) {
      console.error('Error saving category:', error);
      setError('Failed to save category. Please check the console for details.');
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', image: '', navbarCategoryId: '' });
    setIsEditing(false);
    setSelectedCategory(null);
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      console.log('Categories response:', response); // Add this line
      if (response.ok) {
        const data = await response.json();
        console.log('Categories data:', data); // Add this line
        setCategories(data);
        setFilteredCategories(data);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
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

  const handleEdit = (category: Category) => {
    console.log('Editing category:', category); // Add this for debugging

    // Check if description and image exist in the API response
    if (!category.description || !category.image) {
      // Fetch the complete category data if needed
      fetchCategoryDetails(category._id!);
    } else {
      setFormData({
        navbarCategoryId: category.navbarCategoryId || '',
        name: category.name,
        description: category.description || '',
        image: category.image || '',
      });
      setIsEditing(true);
      setSelectedCategory(category);
    }
  };

  // Add this function to fetch complete category details if needed
  const fetchCategoryDetails = async (categoryId: string) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`);
      if (response.ok) {
        const data = await response.json();
        console.log('Fetched category details:', data);

        setFormData({
          navbarCategoryId: data.navbarCategoryId || '',
          name: data.name,
          description: data.description || '',
          image: data.image || '',
        });
        setIsEditing(true);
        setSelectedCategory(data);
      }
    } catch (error) {
      console.error('Error fetching category details:', error);
      setError('Failed to fetch category details');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/categories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchNavbarCategories();
  }, []);

  // Add this to check form data when it changes
  useEffect(() => {
    console.log('Current form data:', formData);
  }, [formData]);

  // Filter categories based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCategories(categories);
    } else {
      const filtered = categories.filter(
        category =>
          category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredCategories(filtered);
    }
  }, [searchTerm, categories]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-900 p-6">
      {/* Form Section */}
      <div
        className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-900 to-blue-700 p-4 rounded-lg text-white">{isEditing ? 'Edit' : 'Add'} Category</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Navbar Category
            </label>
            <select
              value={formData.navbarCategoryId}
              onChange={(e) => setFormData({ ...formData, navbarCategoryId: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Navbar Category</option>
              {navbarCategories.map((navbarCategory) => (
                <option key={navbarCategory._id} value={navbarCategory._id}>
                  {navbarCategory.name}
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
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div>
            <ImageUpload
              key={isEditing ? `edit-${selectedCategory?._id}` : 'add-new'}
              value={formData.image}
              onChange={(url: string) => setFormData({ ...formData, image: url })}
              label="Category Image"
            />
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {isEditing ? 'Update' : 'Add'} Category
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-600 text-gray-100 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-100 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
      </div>

      {/* List Section */}
      <div
        className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-900 to-blue-700 p-4 rounded-lg text-white">Categories</h2>

        {/* Total Count Display */}
        <div className="text-gray-300 font-semibold mb-4">
          Total Categories: {categories.length}
        </div>

        {/* Search Box */}
        <div className="mb-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearchOutline className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <div key={category._id} className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600 hover:bg-gray-600 transition-colors">
              <div className="flex items-center space-x-4">
                {category.image && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                      onError={(e) => {
                        console.error('Image failed to load:', category.image);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-100">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.slug}</p>
                  {category.description && (
                    <p className="text-xs text-gray-400 truncate max-w-[200px]">
                      {category.description || 'No description available'}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <IoCreateOutline className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(category._id!)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                >
                  <IoTrashOutline className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          {filteredCategories.length === 0 && (
            <p className="text-gray-400 text-center py-4">
              {categories.length === 0 ? 'No categories found' : 'No matching categories found'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}