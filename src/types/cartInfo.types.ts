
export interface FullCartResponse {
  status: "success";
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProductItem[];
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
  __v: number;
  totalCartPrice: number;
}

export interface CartProductItem {
  count: number;
  _id: string;
  product: ProductDetails;
  price: number;
}

export interface ProductDetails {
  _id: string;
  title: string;
  quantity: number;
  imageCover: string;
  ratingsAverage: number;
  subcategory: Subcategory[];
  category: Category;
  brand: Brand;
  id: string; // duplicate of _id
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string; // category ID
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}