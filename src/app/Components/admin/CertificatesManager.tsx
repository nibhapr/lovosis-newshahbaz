"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { IoAddOutline, IoTrashOutline, IoCreateOutline } from 'react-icons/io5';
import ImageUpload from '../shared/ImageUpload';

interface Certificate {
    _id: string;
    title: string;
    description?: string;
    images: string[];
    category: string;
    date: string;
}

const CATEGORIES = ['ISO', 'Quality', 'Compliance', 'Awards'];

export default function CertificatesManager() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [''],
        category: CATEGORIES[0]
    });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Certificate | null>(null);

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const response = await fetch('/api/certificates');
            if (!response.ok) throw new Error('Failed to fetch certificates');
            const data = await response.json();
            setCertificates(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching certificates:', error);
            setCertificates([]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = isEditing && selectedItem?._id ? `/api/certificates/${selectedItem._id}` : '/api/certificates';
            const method = isEditing ? 'PUT' : 'POST';

            const data = {
                ...formData,
                images: await Promise.all(formData.images.map(async (image) => {
                    if (image.startsWith('/api/files/')) {
                        return image; // Already uploaded
                    }
                    const response = await fetch(image); // Assuming image is the file URL
                    const fileData = await response.json();
                    return fileData.fullUrl; // Use the full URL returned from the upload
                })),
            };

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                fetchCertificates();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving certificate:', error);
        }
    };

    const handleEdit = (item: Certificate) => {
        setFormData({
            title: item.title,
            description: item.description || '',
            images: item.images,
            category: item.category,
        });
        setIsEditing(true);
        setSelectedItem(item);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this certificate?')) return;

        try {
            const response = await fetch(`/api/certificates/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete certificate');

            await fetchCertificates();
        } catch (error) {
            console.error('Error deleting certificate:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            images: [''],
            category: CATEGORIES[0]
        });
        setIsEditing(false);
        setSelectedItem(null);
    };

    return (
        <div className="p-6 bg-gray-900">
            <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-900 to-blue-700 p-4 rounded-lg text-white shadow-lg">Certificates Management</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div
                    className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
                                rows={3}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Certificate Images</label>
                            <div className="space-y-4">
                                {formData.images.map((image, index) => (
                                    <div key={index} className="flex items-center space-x-4">
                                        <ImageUpload
                                            value={image}
                                            onChange={(url) => {
                                                const newImages = [...formData.images];
                                                newImages[index] = url;
                                                setFormData({ ...formData, images: newImages });
                                            }}
                                            label={`Certificate Image ${index + 1}`}
                                        />
                                        {formData.images.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    const newImages = formData.images.filter((_, i) => i !== index);
                                                    setFormData({ ...formData, images: newImages });
                                                }}
                                                className="text-red-400 hover:text-red-300"
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
                                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                                >
                                    <IoAddOutline className="w-5 h-5" />
                                    <span>Add Another Certificate Image</span>
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                className="w-full px-3 py-2 rounded-lg bg-gray-700 border-gray-600 text-gray-100 focus:ring-2 focus:ring-blue-500"
                                required
                            >
                                {CATEGORIES.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="px-4 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-colors"
                        >
                            {isEditing ? 'Update' : 'Add'} Certificate
                        </button>
                    </form>
                </div>

                {/* Certificates List */}
                <div
                    className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-gray-100">Certificates</h3>
                        <span className="text-gray-400">Total Certificates: {certificates.length}</span>
                    </div>
                    <div className="space-y-4">
                        {Array.isArray(certificates) && certificates.length > 0 ? (
                            certificates.map((item) => (
                                <div key={item._id} className="p-4 border border-gray-700 rounded-lg bg-gray-700 hover:border-blue-500 transition-colors">
                                    <h3 className="font-medium text-gray-100">{item.title}</h3>
                                    <p className="text-sm text-gray-400">{item.category}</p>
                                    <div className="grid grid-cols-2 gap-2 mt-2">
                                        {item.images.map((img, idx) => (
                                            <Image key={idx} src={img} alt={`Certificate Image ${idx + 1}`} width={100} height={100} className="object-cover rounded" />
                                        ))}
                                    </div>
                                    <div className="flex space-x-3 mt-3">
                                        <button onClick={() => handleEdit(item)} className="text-blue-400 hover:text-blue-300 transition-colors">
                                            <IoCreateOutline className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className="text-red-400 hover:text-red-300 transition-colors">
                                            <IoTrashOutline className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-400">No certificates found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}