interface NavbarCategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface Category {
  id: string;
  _id?: string;  // Add this for MongoDB compatibility
  name: string;
  slug: string;
  description?: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
  navbarCategoryId?: string;
}

interface Subcategory {
  id: string;
  _id?: string;  // Add this for MongoDB compatibility
  navbarCategoryId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  image: string;
}

type Product = {
    description: string;
    _id: string;
    name: string;
    images: string[];
    navbarCategoryId: string | NavbarCategory;
    categoryId?: string;
    subcategoryId?: string;
    catalogImage?: string | null;
    catalogImages?: string[];
    // other properties
};

export interface Review {
  _id: string;
  itemId: string;
  itemType: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export type { NavbarCategory, Category, Subcategory, Product };
