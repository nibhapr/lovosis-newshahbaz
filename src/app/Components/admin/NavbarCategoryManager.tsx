"use client";

import { useState, useEffect } from 'react';
import { IoTrashOutline, IoCreateOutline, IoSearchOutline } from 'react-icons/io5';
import Image from 'next/image';
import ImageUpload from '@/app/Components/shared/ImageUpload';

interface NavbarCategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

export default function NavbarCategoryManager() {
  const [categories, setCategories] = useState<NavbarCategory[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<NavbarCategory | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<NavbarCategory[]>([]);

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/navbarcategories');
      const data = await response.json();
      setCategories(data);
      setFilteredCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const categoryData = {
      ...formData,
      slug: generateSlug(formData.name),
    };

    try {
      const url = isEditing
        ? `/api/navbarcategories/${selectedCategory?._id}`
        : '/api/navbarcategories';

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(categoryData),
      });

      if (response.ok) {
        fetchCategories();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleEdit = (category: NavbarCategory) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      image: category.image || '',
    });
    setIsEditing(true);
    setSelectedCategory(category);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`/api/navbarcategories/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', description: '', image: '' });
    setIsEditing(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-900 p-6">
      {/* Form Section */}
      <div
        className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
      >
        <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-900 to-blue-700 p-4 rounded-lg text-white">
          {isEditing ? 'Edit' : 'Add'} Navbar Category
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
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
              className="w-full px-4 py-2 rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div>
            <ImageUpload
              value={formData.image}
              onChange={(url: string) => setFormData({ ...formData, image: url })}
              label="Category Image"
            />
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-colors"
            >
              {isEditing ? 'Update' : 'Add'} Category
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
      <div
        className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-900 to-blue-700 p-4 rounded-lg text-white">Navbar Categories</h2>
          <span className="text-gray-400 text-lg">Total Categories: {categories.length}</span>
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
            className="w-full pl-10 px-4 py-2 rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="space-y-4">
          {filteredCategories.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600 hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center space-x-4">
                {category.image && (
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={category.image || '/images/placeholder.jpg'}
                      alt={category.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <h3 className="font-medium text-gray-100">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.slug}</p>
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
              {searchTerm ? 'No matching categories found' : 'No categories found'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}