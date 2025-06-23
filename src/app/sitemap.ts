import { MetadataRoute } from 'next'
import { connectDB } from '@/lib/db'
import Category from '@/app/models/Category'
import Subcategory from '@/app/models/Subcategory'
import Product from '@/app/models/Product'
import NavbarCategory from '@/app/models/NavbarCategory'
import BlogPost from '@/app/models/Blog'
import Event from '@/app/models/Event'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://lovosis.in'

  await connectDB()

  const [categories, subcategories, products, navbarCategories, blogPosts, eventPosts] = await Promise.all([
    Category.find({}),
    Subcategory.find({}),
    Product.find({}),
    NavbarCategory.find({}),
    BlogPost.find({}),
    Event.find({}),
  ])

  // ===== Static Routes =====
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/contact',
    '/services',
    '/careers',
    '/blog',
    '/events',
    '/gallery',
    '/terms-of-service',
    '/privacy-policy',
    '/cookie-policy',
    '/sitemap.xml',
    '/robots.txt',
    '/services/it-services',
    '/services/electronics-manufacturing',
    '/products',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }))

  // ===== Blog Routes =====
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // ===== Event Routes =====
  const eventRoutes: MetadataRoute.Sitemap = eventPosts.map(event => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event.updatedAt || event.createdAt).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  // ===== Navbar Category Routes =====
  const navbarCategoryRoutes: MetadataRoute.Sitemap = navbarCategories.map(nav => ({
    url: `${baseUrl}/products/${nav.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: 0.9,
  }))

  // ===== Category Routes: /products/:navbarCategorySlug/:categorySlug =====
  const categoryRoutes: MetadataRoute.Sitemap = categories
    .map(category => {
      const navbarCategory = navbarCategories.find(nav => nav._id.toString() === category.navbarCategoryId?.toString())
      if (!navbarCategory) return null

      return {
        url: `${baseUrl}/products/${navbarCategory.slug}/${category.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.85,
      }
    })
    .filter(Boolean) as MetadataRoute.Sitemap

  // ===== Subcategory Routes: /products/:navbarCategorySlug/:categorySlug/:subcategorySlug =====
  const subcategoryRoutes: MetadataRoute.Sitemap = subcategories
    .map(subcategory => {
      const category = categories.find(cat => cat._id.toString() === subcategory.categoryId?.toString())
      if (!category) return null

      const navbarCategory = navbarCategories.find(nav => nav._id.toString() === category.navbarCategoryId?.toString())
      if (!navbarCategory) return null

      return {
        url: `${baseUrl}/products/${navbarCategory.slug}/${category.slug}/${subcategory.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.8,
      }
    })
    .filter(Boolean) as MetadataRoute.Sitemap

  // ===== Product Routes: /products/:navbarCategorySlug/:categorySlug/:subcategorySlug/:productSlug =====
  const productRoutes: MetadataRoute.Sitemap = products
    .map(product => {
      const subcategory = subcategories.find(sub => sub._id.toString() === product.subcategoryId?.toString())
      if (!subcategory) return null

      const category = categories.find(cat => cat._id.toString() === subcategory.categoryId?.toString())
      if (!category) return null

      const navbarCategory = navbarCategories.find(nav => nav._id.toString() === category.navbarCategoryId?.toString())
      if (!navbarCategory) return null

      return {
        url: `${baseUrl}/products/${navbarCategory.slug}/${category.slug}/${subcategory.slug}/${product.slug}`,
        lastModified: new Date().toISOString(),
        changeFrequency: 'daily',
        priority: 0.7,
      }
    })
    .filter(Boolean) as MetadataRoute.Sitemap

  return [
    ...staticRoutes,
    ...blogRoutes,
    ...eventRoutes,
    ...navbarCategoryRoutes,
    ...categoryRoutes,
    ...subcategoryRoutes,
    ...productRoutes,
  ]
}
