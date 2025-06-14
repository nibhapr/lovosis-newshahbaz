"use client";

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { IoDownloadOutline, IoStarOutline, IoStar, IoClose } from 'react-icons/io5';
import ReviewForm from '@/app/Components/shared/ReviewForm';
import type { Product, Review } from '@/types/shop';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductPage({
  params
}: {
  params: Promise<{ category: string; subcategory: string; product: string }>
}) {
  // State management
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isReviewsOpen, setIsReviewsOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const resolvedParams = use(params);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [catalogImages, setCatalogImages] = useState<string[]>([]);
  const [currentCatalogIndex, setCurrentCatalogIndex] = useState(0);
  const [isCatalogImageOpen, setIsCatalogImageOpen] = useState(false);

  // Data fetching
  const fetchReviews = async () => {
    if (product?._id) {
      try {
        const response = await fetch(`/api/reviews?itemId=${product._id}&itemType=product`);
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/products/preview?slug=${resolvedParams.product}`, {
        next: { revalidate: 0 },
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        const hasChanged = JSON.stringify(data) !== JSON.stringify(product);
        
        if (hasChanged) {
          setProduct(data);
          setCatalogImages(data.catalogImages || [data.catalogImage].filter(Boolean));
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  // Effects
  useEffect(() => {
    fetchProduct();

    // const ws = new WebSocket(`${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/api/websocket`);

    // ws.onmessage = (event) => {
    //   const data = JSON.parse(event.data);
    //   if (data.type === 'product_updated' && data.slug === resolvedParams.product) {
    //     fetchProduct();
    //   }
    // };

    // ws.onerror = (error) => {
    //   console.error('WebSocket error:', error);
    //   const pollingInterval = setInterval(fetchProduct, 3000);
    //   return () => clearInterval(pollingInterval);
    // };

    // const handleVisibilityChange = () => {
    //   if (document.visibilityState === 'visible') fetchProduct();
    // };
    
    // document.addEventListener('visibilitychange', handleVisibilityChange);
    // return () => {
    //   ws.close();
    //   document.removeEventListener('visibilitychange', handleVisibilityChange);
    // };
  }, [resolvedParams.product]);

  useEffect(() => {
    fetchReviews();
  }, [product?._id]);

  useEffect(() => {
    document.body.style.overflow = (isReviewsOpen || isContactFormOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isReviewsOpen, isContactFormOpen]);

  // Helpers
  const averageRating = reviews.length
    ? Number((reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length).toFixed(1))
    : 0;

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star}>
          {star <= Math.round(rating) ? (
            <IoStar className="w-4 h-4 text-yellow-400" />
          ) : (
            <IoStarOutline className="w-4 h-4 text-yellow-400" />
          )}
        </span>
      ))}
    </div>
  );

  // Handlers
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);

    try {
      const response = await fetch('/api/catalog-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.get('fullName'),
          companyName: formData.get('companyName'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          productName: product?.name,
          catalogImages
        })
      });

      if (!response.ok) throw new Error('Failed to create catalog request');
      setIsContactFormOpen(false);
      alert('Request submitted successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert(`Failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  // Structured data for SEO
  useEffect(() => {
    if (!product) return;

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.description ?? '',
      image: product.images,
      aggregateRating: reviews.length ? {
        '@type': 'AggregateRating',
        ratingValue: averageRating,
        reviewCount: reviews.length
      } : undefined,
      review: reviews.map(review => ({
        '@type': 'Review',
        reviewRating: { '@type': 'Rating', ratingValue: review.rating },
        author: { '@type': 'Person', name: review.name },
        reviewBody: review.comment
      }))
    });
    
    document.head.appendChild(script);
    return () => { document.head.removeChild(script); };
  }, [product, reviews, averageRating]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-pulse text-black">Loading product information...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center text-black">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-3 py-4 sm:px-4 sm:py-6 md:py-8 text-center">
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-3 sm:mb-4 animate-fade-in line-clamp-2 tracking-tight">
          {product.name}
        </h1>
        <div className="w-10 sm:w-12 md:w-16 h-1 bg-blue-600 rounded-full mx-auto transform transition-all duration-300"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Left Column - Product Images and Reviews */}
          <div className="space-y-4 sm:space-y-6 mx-auto w-full max-w-lg">
            {/* Product Image Gallery */}
            <div className="group">
              <Zoom>
                <div className="aspect-square relative rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-white">
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-contain p-2 sm:p-4"
                    priority
                    quality={100}
                    unoptimized
                  />
                  {product.images.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {currentImageIndex + 1}/{product.images.length}
                    </div>
                  )}
                </div>
              </Zoom>
            </div>

            {/* Thumbnail Navigation */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square rounded-md overflow-hidden transition-all
                      ${currentImageIndex === index ? 'ring-2 ring-blue-600 scale-95' : 'ring-1 ring-gray-300 hover:ring-blue-400'}`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover p-1"
                      quality={100}
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Catalog Request Button */}
            <button
              onClick={() => setIsContactFormOpen(true)}
              className="w-full py-3 sm:py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 active:bg-blue-800 transition-all flex items-center justify-center gap-2 text-sm sm:text-base shadow-lg hover:shadow-xl"
            >
              <IoDownloadOutline className="w-4 h-4 sm:w-5 sm:h-5" />
              Request Product Catalog
            </button>

            {/* Reviews Section */}
            <div className="bg-gray-50 rounded-lg shadow-sm p-4 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="text-lg font-bold text-black flex items-center gap-2">
                    <span className="w-1 h-5 bg-yellow-400 rounded-full"></span>
                    Customer Reviews
                  </h2>
                </div>
                <button
                  onClick={() => setIsReviewsOpen(true)}
                  className="px-4 py-1.5 bg-yellow-500 text-black text-sm rounded-lg hover:bg-yellow-400"
                >
                  Write a Review
                </button>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-black">
                      {averageRating}
                    </div>
                    {renderStars(averageRating)}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-gray-300">
                      {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                    </div>
                    <div className="h-1.5 bg-zinc-700 rounded-full mt-1">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${(averageRating / 5) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews List */}
              <div className="space-y-3">
                {reviews.length > 0 ? (
                  <>
                    {reviews.slice(0, 2).map((review) => (
                      <div key={review._id} className="bg-zinc-800/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded-full bg-blue-900 flex items-center justify-center">
                            <span className="text-blue-400 font-semibold text-xs">
                              {review.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-medium text-white text-sm">{review.name}</h3>
                            <div className="flex items-center gap-2">
                              {renderStars(review.rating)}
                              <span className="text-xs text-gray-400">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300 text-xs">
                          {review.comment.substring(0, 100)}{review.comment.length > 100 ? '...' : ''}
                        </p>
                      </div>
                    ))}
                    {reviews.length > 2 && (
                      <button
                        onClick={() => setIsReviewsOpen(true)}
                        className="w-full py-2 text-blue-400 bg-blue-900/30 rounded-lg text-sm hover:bg-blue-900/50"
                      >
                        See all {reviews.length} reviews
                      </button>
                    )}
                  </>
                ) : (
                  <div className="text-center py-4 bg-zinc-800/50 rounded-lg">
                    <p className="text-gray-400 text-sm">No reviews yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Catalog Preview */}
          <div className="mx-auto w-full max-w-lg">
            <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 border border-gray-200 min-h-[450px] sm:min-h-[550px]">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="w-1 h-5 bg-blue-600 rounded-full"></span>
                Product Catalog
              </h2>

              <div className="aspect-[3/4] relative rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                {catalogImages.length > 0 ? (
                  <div className="relative h-full">
                    <button
                      onClick={() => setIsCatalogImageOpen(true)}
                      className="w-full h-full cursor-zoom-in"
                    >
                      <Image
                        src={catalogImages[currentCatalogIndex]}
                        alt={`${product.name} Catalog Page ${currentCatalogIndex + 1}`}
                        fill
                        className="object-contain p-2 sm:p-4"
                        quality={100}
                        unoptimized
                      />
                      {catalogImages.length > 1 && (
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                          {currentCatalogIndex + 1}/{catalogImages.length}
                        </div>
                      )}
                    </button>
                    {catalogImages.length > 1 && (
                      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                        {catalogImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={(e) => {
                              e.stopPropagation();
                              setCurrentCatalogIndex(index);
                            }}
                            className={`w-2 h-2 rounded-full transition-all
                              ${currentCatalogIndex === index ? 'bg-blue-600' : 'bg-zinc-700'}`}
                            aria-label={`View catalog page ${index + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 text-sm">No catalog images available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Catalog Image Zoom Modal */}
      {isCatalogImageOpen && catalogImages.length > 0 && (
        <>
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50"
            onClick={() => setIsCatalogImageOpen(false)}
          />
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setIsCatalogImageOpen(false)}
          >
            <div
              className="relative w-full max-w-5xl h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsCatalogImageOpen(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
                aria-label="Close"
              >
                <IoClose className="w-6 h-6 text-white" />
              </button>
              <div 
                className="h-full w-full relative cursor-zoom-in overflow-hidden"
              >
                <div 
                  className="h-full w-full transition-transform duration-100 origin-center"
                  style={{
                    transform: 'scale(1)',
                    backgroundImage: `url(${catalogImages[currentCatalogIndex]})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                  }}
                  onMouseMove={(e) => {
                    const target = e.currentTarget;
                    const container = target.parentElement;
                    if (!container) return;
                    
                    const containerRect = container.getBoundingClientRect();
                    const x = e.clientX - containerRect.left;
                    const y = e.clientY - containerRect.top;
                    
                    const xPercent = (x / containerRect.width) * 100;
                    const yPercent = (y / containerRect.height) * 100;
                    
                    target.style.transformOrigin = `${xPercent}% ${yPercent}%`;
                    target.style.transform = 'scale(2)';
                    
                    const scrollX = (xPercent - 50) * 2;
                    const scrollY = (yPercent - 50) * 2;
                    container.scrollLeft = scrollX;
                    container.scrollTop = scrollY;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    const container = e.currentTarget.parentElement;
                    if (container) {
                      container.scrollLeft = 0;
                      container.scrollTop = 0;
                    }
                  }}
                />
              </div>
              {catalogImages.length > 1 && (
                <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
                  {catalogImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentCatalogIndex(index);
                      }}
                      className={`w-3 h-3 rounded-full transition-all
                        ${currentCatalogIndex === index ? 'bg-white' : 'bg-white/50'}`}
                      aria-label={`View catalog page ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Review Modal */}
      {isReviewsOpen && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-all duration-300" />
          <div className="fixed inset-x-0 top-[100px] bottom-0 z-50 flex items-start justify-center overflow-hidden p-4">
            <div className="bg-zinc-900 rounded-lg max-w-3xl w-full shadow-2xl animate-modalSlideIn max-h-[calc(100vh-120px)] flex flex-col border border-zinc-800">
              <div className="sticky top-0 bg-zinc-900 p-4 border-b border-zinc-800 flex items-center justify-between z-10 rounded-t-lg">
                <div>
                  <h2 className="text-lg font-bold text-white">Product Reviews</h2>
                  <p className="text-xs text-gray-400 mt-1">Share your experience with others</p>
                </div>
                <button
                  onClick={() => setIsReviewsOpen(false)}
                  className="p-1 hover:bg-zinc-800 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <IoClose className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-3 mb-4">
                  {reviews.length > 0 ? (
                    <>
                      <div className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-xs">
                                {reviews[0].name.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900 text-sm">{reviews[0].name}</h3>
                              <p className="text-xs text-gray-500">
                                {new Date(reviews[0].createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                            {renderStars(reviews[0].rating)}
                            <span className="text-xs font-medium text-gray-700">
                              {reviews[0].rating}/5
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-700 text-xs bg-gray-50 p-2 rounded-lg">{reviews[0].comment}</p>
                      </div>

                      {reviews.length > 1 && (
                        <button
                          onClick={() => setShowAllReviews(!showAllReviews)}
                          className="w-full py-2 px-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-blue-600 hover:text-blue-700 text-xs font-medium transition-all flex items-center justify-center gap-2"
                        >
                          {showAllReviews ? (
                            <>
                              Show Less
                              <svg className="w-3 h-3 transition-transform duration-300 -rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          ) : (
                            <>
                              Show {reviews.length - 1} More {reviews.length - 1 === 1 ? 'Review' : 'Reviews'}
                              <svg className="w-3 h-3 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </>
                          )}
                        </button>
                      )}

                      {showAllReviews && (
                        <div className="space-y-3 animate-fadeIn">
                          {reviews.slice(1).map((review) => (
                            <div
                              key={review._id}
                              className="bg-white border border-gray-100 p-4 rounded-lg shadow-sm"
                            >
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                  <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center">
                                    <span className="text-blue-600 font-semibold text-xs">
                                      {review.name.charAt(0).toUpperCase()}
                                    </span>
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-gray-900 text-sm">{review.name}</h3>
                                    <p className="text-xs text-gray-500">
                                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded-lg">
                                  {renderStars(review.rating)}
                                  <span className="text-xs font-medium text-gray-700">
                                    {review.rating}/5
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-700 text-xs bg-gray-50 p-2 rounded-lg">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                      <div className="text-gray-400 mb-2">
                        <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium text-sm">No reviews yet.</p>
                      <p className="text-gray-400 text-xs">Be the first to review this product!</p>
                    </div>
                  )}
                </div>

                {product._id && (
                  <div className="border-t pt-4">
                    <ReviewForm itemId={product._id} itemType="product" onSubmitSuccess={fetchReviews} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Contact Form Modal */}
      {isContactFormOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-all duration-300" />
          <div className="fixed inset-x-0 top-[100px] bottom-0 z-50 flex items-start justify-center overflow-hidden p-4">
            <div className="bg-white rounded-lg max-w-md w-full shadow-lg animate-modalSlideIn">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Request Catalog</h2>
                <button
                  onClick={() => setIsContactFormOpen(false)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <IoClose className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <div>
                  <label htmlFor="fullName" className="block text-xs font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="companyName" className="block text-xs font-medium text-gray-700 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                    placeholder="Enter your company name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-xs font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-xs"
                    placeholder="Enter your phone number"
                  />
                </div>

                <p className="text-xs text-gray-500 italic">
                  We'll send the catalog to your email address & phone number.
                </p>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs shadow-sm"
                >
                  Submit & Download
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out;
        }

        @keyframes modalSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-modalSlideIn {
          animation: modalSlideIn 0.3s ease-out;
        }

        .animate-fadeIn {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}