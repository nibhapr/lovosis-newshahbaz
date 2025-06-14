"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoAddOutline, IoTrashOutline, IoCreateOutline, IoSearchOutline, IoChevronDownOutline } from 'react-icons/io5';
import type { NavbarCategory, Category, Subcategory, Product } from '@/types/shop';
import ImageUpload from '@/app/Components/shared/ImageUpload';
import Swal from 'sweetalert2'

export default function ProductManager() {
    const [navbarCategories, setNavbarCategories] = useState<NavbarCategory[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [formData, setFormData] = useState({
        _id: '',
        name: '',
        images: [''],
        navbarCategoryId: '',
        categoryId: '',
        subcategoryId: '',
        catalogImage: null as string | null,
        catalogImages: [''],
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDuplicateOptions, setShowDuplicateOptions] = useState<string | null>(null);

    const generateSlug = (name: string) => {
        return name.toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    };

    const generateSignature = async (timestamp: number) => {
        const response = await fetch('/api/generate-signature', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ timestamp }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate signature');
        }

        const { signature } = await response.json();
        return signature;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/products', {
                method: isEditing ? "PUT" : "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Server error: ${response.status} - ${errorText}`);
            }

            const result = await response.json();
            console.log('Product saved:', result);
            resetForm();
            setIsEditing(false);
            Swal.fire({
                icon: 'success',
                title: isEditing ? 'Product Updated' : 'Product Added',
                timer: 1500,
            })
            // Handle success (e.g., show a success message or redirect)
        } catch (error) {
            console.error('Error saving product:', error);
            // Handle error (e.g., show an error message to the user)
        }
    };

    const resetForm = () => {
        setFormData({
            _id: '',
            name: '',
            images: [''],
            navbarCategoryId: '',
            categoryId: '',
            subcategoryId: '',
            catalogImage: null,
            catalogImages: [''],
        });
        setIsEditing(false);
        setSelectedProduct(null);
    };

    const fetchNavbarCategories = async () => {
        try {
            console.log('Fetching navbar categories...');
            const response = await fetch('/api/navbarcategories');

            // Log the raw response for debugging
            console.log('Response status:', response.status);

            if (response.ok) {
                const data = await response.json();
                console.log('Received navbar categories:', data);

                if (Array.isArray(data) && data.length > 0) {
                    setNavbarCategories(data);
                } else {
                    console.warn('Received empty or invalid navbar categories data:', data);
                }
            } else {
                console.error('Failed to fetch navbar categories:', response.status, response.statusText);
                // Try to get error details
                const errorText = await response.text();
                console.error('Error details:', errorText);
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
                setCategories(data);
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

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            if (response.ok) {
                const data = await response.json();
                console.log('Fetched products:', data);
                setProducts(data.map((product: any) => ({
                    ...product,
                    categoryId: product.categoryId?._id || product.categoryId,
                    subcategoryId: product.subcategoryId?._id || product.subcategoryId
                })));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (productId: string | undefined) => {
        if (!productId) return;
        if (!confirm('Are you sure you want to delete this product?')) return;

        try {
            const response = await fetch(`/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                await fetchProducts();
            } else {
                const error = await response.json();
                console.error('Error:', error);
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    useEffect(() => {
        console.log('Component mounted, fetching data...');
        fetchNavbarCategories();
        fetchCategories();
        fetchSubcategories();
        fetchProducts();
    }, []);

    useEffect(() => {
        if (formData.navbarCategoryId) {
            // Fetch categories for selected navbar category
            const matchingCategories = categories.filter(cat => cat.navbarCategoryId === formData.navbarCategoryId);
            if (matchingCategories.length > 0) {
                // Keep existing category if it matches the navbar category
                const currentCategoryValid = matchingCategories.some(cat => cat._id === formData.categoryId);
                if (!currentCategoryValid) {
                    setFormData(prev => ({
                        ...prev,
                        categoryId: '',
                        subcategoryId: ''
                    }));
                }
            }
        }
    }, [formData.navbarCategoryId, categories]);

    useEffect(() => {
        if (formData.categoryId) {
            // Fetch subcategories for selected category
            const matchingSubcategories = subcategories.filter(sub => sub.categoryId === formData.categoryId);
            if (matchingSubcategories.length > 0) {
                // Keep existing subcategory if it matches the category
                const currentSubcategoryValid = matchingSubcategories.some(sub => sub._id === formData.subcategoryId);
                if (!currentSubcategoryValid) {
                    setFormData(prev => ({
                        ...prev,
                        subcategoryId: ''
                    }));
                }
            }
        }
    }, [formData.categoryId, subcategories]);

    // Add new filtered categories state
    const filteredCategories = categories.filter(
        cat => cat.navbarCategoryId === formData.navbarCategoryId
    );

    // Update filteredSubcategories to consider navbarCategoryId
    const filteredSubcategories = subcategories.filter(
        sub => sub.categoryId === formData.categoryId &&
            categories.find(cat => cat._id === sub.categoryId)?.navbarCategoryId === formData.navbarCategoryId
    );

    const handlePdfError = (pdfUrl: string) => {
        console.error('Failed to load PDF:', pdfUrl);
        setIsLoadingPdf(false);
        alert('Failed to load PDF. Please make sure it\'s a valid PDF file and properly uploaded.');

        // Try reloading with cache-busting
        const iframe = document.querySelector(`iframe[src="${pdfUrl}"]`) as HTMLIFrameElement;
        if (iframe) {
            const newUrl = `${pdfUrl}?t=${new Date().getTime()}`;
            iframe.src = newUrl;
        }
    };

    const handleCatalogImageUpload = async (index: number, file: File) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', 'catalog');

            const response = await fetch('/api/files', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to upload catalog image');
            }

            const data = await response.json();

            setFormData(prev => {
                const newCatalogImages = [...prev.catalogImages];
                newCatalogImages[index] = data.secure_url;
                return {
                    ...prev,
                    catalogImages: newCatalogImages,
                };
            });
        } catch (error) {
            console.error('Error uploading catalog image:', error);
            alert('Failed to upload catalog image');
        }
    };

    const findDuplicates = (product: Product) => {
        return products.filter(p => {
            if (p._id === product._id) return false;
            return p.name.toLowerCase() === product.name.toLowerCase()
        });
    };

    // Sort duplicates alphabetically
    const findDuplicatesByImage = () => {
        return products
            .filter(p =>
                products.some(other =>
                    other._id !== p._id &&
                    other.images.some(img => p.images.includes(img))
                )
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    };

    const findDuplicatesByName = () => {
        return products
            .filter(p =>
                products.some(other =>
                    other._id !== p._id &&
                    other.name.toLowerCase() === p.name.toLowerCase()
                )
            )
            .sort((a, b) => a.name.localeCompare(b.name));
    };

    // Filter products based on search term
    const filteredProducts: Product[] = products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function handleEdit(product: Product): void {
        setIsEditing(true);
        setSelectedProduct(product);

        // Use the product's navbarCategoryId directly if available, otherwise try to find it from the category
        const navbarCategoryId = product.navbarCategoryId || (() => {
            const category = categories.find(c => c._id === product.categoryId);
            return category?.navbarCategoryId || '';
        })();

        // Process catalog images - ensure we have both catalogImage and catalogImages
        let catalogImagesData = [''];
        if (product.catalogImages && Array.isArray(product.catalogImages) && product.catalogImages.length > 0) {
            catalogImagesData = product.catalogImages;
        } else if (product.catalogImage) {
            catalogImagesData = [product.catalogImage];
        }

        setFormData({
            _id: product._id,
            name: product.name,
            images: product.images || [''],
            navbarCategoryId: typeof navbarCategoryId === 'string' ? navbarCategoryId : navbarCategoryId?._id || '',
            categoryId: product.categoryId || '',
            subcategoryId: product.subcategoryId || '',
            catalogImage: product.catalogImage || null,
            catalogImages: catalogImagesData,
        });
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-gray-900 p-6">
            {/* Form Section */}
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                        {isEditing ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <div className="bg-blue-900/50 text-blue-200 px-4 py-2 rounded-lg">
                        Total: {products.length}
                    </div>
                </div>
                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                    {isEditing ? 'Edit Product' : 'Add New Product'}
                </h2>

                {/* Duplicates Section */}
                <div className="mb-6 space-y-4">
                    {/* Name Duplicates */}
                    <div className="bg-gray-700 rounded-lg p-4">
                        <h3 className="text-xl font-semibold text-blue-400 mb-4">Product Name Duplicates</h3>
                        <div className="space-y-2">
                            {findDuplicatesByName().map(product => (
                                <div key={product._id} className="relative">
                                    <button
                                        onClick={() => setShowDuplicateOptions(showDuplicateOptions === product._id ? null : product._id)}
                                        className="w-full flex items-center justify-between p-2 bg-gray-600 rounded hover:bg-gray-500"
                                    >
                                        <span className="text-gray-200">{product.name}</span>
                                        <IoChevronDownOutline className={`w-5 h-5 text-gray-300 transition-transform ${showDuplicateOptions === product._id ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showDuplicateOptions === product._id && (
                                        <div className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                                            <div className="py-1">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 flex items-center gap-2"
                                                >
                                                    <IoCreateOutline className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-600 flex items-center gap-2"
                                                >
                                                    <IoTrashOutline className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Duplicates */}
                    <div className="bg-gray-700 rounded-lg p-4">
                        <h3 className="text-xl font-semibold text-blue-400 mb-4">Product Image Duplicates</h3>
                        <div className="space-y-2">
                            {findDuplicatesByImage().map(product => (
                                <div key={product._id} className="relative">
                                    <button
                                        onClick={() => setShowDuplicateOptions(showDuplicateOptions === product._id ? null : product._id)}
                                        className="w-full flex items-center justify-between p-2 bg-gray-600 rounded hover:bg-gray-500"
                                    >
                                        <div className="flex items-center space-x-2">
                                            {product.images && product.images[0] && (
                                                <div className="relative w-8 h-8 rounded overflow-hidden">
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        sizes="32px"
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <span className="text-gray-200">{product.name}</span>
                                        </div>
                                        <IoChevronDownOutline className={`w-5 h-5 text-gray-300 transition-transform ${showDuplicateOptions === product._id ? 'rotate-180' : ''}`} />
                                    </button>
                                    {showDuplicateOptions === product._id && (
                                        <div className="absolute z-10 mt-1 w-full rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                                            <div className="py-1">
                                                <button
                                                    onClick={() => handleEdit(product)}
                                                    className="w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-600 flex items-center gap-2"
                                                >
                                                    <IoCreateOutline className="w-4 h-4" />
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-600 flex items-center gap-2"
                                                >
                                                    <IoTrashOutline className="w-4 h-4" />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Navbar Category
                        </label>
                        <select
                            value={formData.navbarCategoryId}
                            onChange={(e) => {
                                const newNavbarCategoryId = e.target.value;
                                setFormData(prev => ({
                                    ...prev,
                                    navbarCategoryId: newNavbarCategoryId,
                                    // Only reset category and subcategory if navbar category actually changed
                                    ...(prev.navbarCategoryId !== newNavbarCategoryId ? {
                                        categoryId: '',
                                        subcategoryId: ''
                                    } : {})
                                }));
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value="">Select a navbar category</option>
                            {navbarCategories
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((navbarCategory) => (
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
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    categoryId: e.target.value,
                                    subcategoryId: '',
                                });
                            }}
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
                            disabled={!formData.navbarCategoryId}
                        >
                            <option value="">Select a category (optional)</option>
                            {filteredCategories
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Subcategory
                        </label>
                        <select
                            value={formData.subcategoryId}
                            onChange={(e) => setFormData({ ...formData, subcategoryId: e.target.value })}
                            className="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
                            disabled={!formData.categoryId}
                        >
                            <option value="">Select a subcategory (optional)</option>
                            {filteredSubcategories
                                .sort((a, b) => a.name.localeCompare(b.name))
                                .map((subcategory) => (
                                    <option key={subcategory._id} value={subcategory._id}>
                                        {subcategory.name}
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
                            Product Images
                        </label>
                        <div className="space-y-4">
                            {formData.images.map((image, index) => (
                                <div key={`image-${index}`} className="flex items-center space-x-4">
                                    <ImageUpload
                                        value={image}
                                        onChange={(url: string) => {
                                            const newImages = [...formData.images];
                                            newImages[index] = url;
                                            setFormData(prevState => ({
                                                ...prevState,
                                                images: newImages
                                            }));
                                        }}
                                        label={`Image ${index + 1}`}
                                        index={index}
                                    />
                                    {formData.images.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newImages = formData.images.filter((_, i) => i !== index);
                                                setFormData(prevState => ({
                                                    ...prevState,
                                                    images: newImages
                                                }));
                                            }}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <IoTrashOutline className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(prevState => ({
                                        ...prevState,
                                        images: [...prevState.images, '']
                                    }));
                                }}
                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                            >
                                <IoAddOutline className="w-5 h-5" />
                                <span>Add Another Image</span>
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Catalog Images
                        </label>
                        <div className="space-y-4">
                            {formData.catalogImages.map((image, index) => (
                                <div key={`catalog-${index}`} className="flex items-center space-x-4">
                                    <ImageUpload
                                        value={image}
                                        onChange={(url: string) => {
                                            const newImages = [...formData.catalogImages];
                                            newImages[index] = url;
                                            setFormData(prevState => ({
                                                ...prevState,
                                                catalogImages: newImages
                                            }));
                                        }}
                                        label={`Catalog Image ${index + 1}`}
                                        index={index}
                                    />
                                    {formData.catalogImages.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newImages = formData.catalogImages.filter((_, i) => i !== index);
                                                setFormData(prevState => ({
                                                    ...prevState,
                                                    catalogImages: newImages
                                                }));
                                            }}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            <IoTrashOutline className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => {
                                    setFormData(prevState => ({
                                        ...prevState,
                                        catalogImages: [...prevState.catalogImages, '']
                                    }));
                                }}
                                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                            >
                                <IoAddOutline className="w-5 h-5" />
                                <span>Add Another Catalog Image</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex space-x-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-lg hover:from-blue-700 hover:to-blue-500 transition-colors"
                        >
                            {isEditing ? 'Update' : 'Add'} Product
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
                <h2 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
                    Products
                </h2>

                {/* Search Box */}
                <div className="mb-4 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <IoSearchOutline className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-gray-200 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="space-y-4">
                    {filteredProducts.length === 0 ? (
                        <p className="text-gray-400 text-center py-4">No products found</p>
                    ) : (
                        filteredProducts.map((product) => {
                            const duplicates = findDuplicates(product);
                            return (
                                <div
                                    key={product._id}
                                    className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600"
                                >
                                    <div className="flex items-center space-x-4">
                                        {product.images && product.images[0] && (
                                            <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    fill
                                                    sizes="48px"
                                                    className="object-cover"
                                                />
                                            </div>
                                        )}
                                        <div>
                                            <h3 className="font-medium text-gray-200">{product.name}</h3>
                                            {duplicates.length > 0 && (
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setShowDuplicateOptions(showDuplicateOptions === product._id ? null : product._id)}
                                                        className="text-sm text-yellow-400 hover:text-yellow-300"
                                                    >
                                                        {duplicates.length} duplicate{duplicates.length > 1 ? 's' : ''}
                                                    </button>
                                                    {showDuplicateOptions === product._id && (
                                                        <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5">
                                                            <div className="py-1">
                                                                {duplicates.map(duplicate => (
                                                                    <div key={duplicate._id} className="px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 flex justify-between items-center">
                                                                        <span>{duplicate.name}</span>
                                                                        <div className="flex space-x-2">
                                                                            <button
                                                                                onClick={() => handleEdit(duplicate)}
                                                                                className="text-blue-400 hover:text-blue-300"
                                                                            >
                                                                                <IoCreateOutline className="w-4 h-4" />
                                                                            </button>
                                                                            <button
                                                                                onClick={() => handleDelete(duplicate._id)}
                                                                                className="text-red-400 hover:text-red-300"
                                                                            >
                                                                                <IoTrashOutline className="w-4 h-4" />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="p-2 text-blue-400 hover:text-blue-300 transition-colors"
                                        >
                                            <IoCreateOutline className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="p-2 text-red-400 hover:text-red-300 transition-colors"
                                        >
                                            <IoTrashOutline className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}