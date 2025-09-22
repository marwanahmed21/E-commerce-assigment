import { Product } from "./products.types";

export type CategoriesState = {
  categories: null | Category[];
  category: null | Product[];
};

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}

export interface CategoryResponse {
  results: number;
  metadata: Metadata;
  data: Category[];
}
