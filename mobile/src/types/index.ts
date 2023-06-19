export interface ProductProps {
  _id: string;
  name: string;
  description: string;
  imagePath: string;
  price: number;
  ingredients: {
    name: string;
    icon: string;
    _id: string;
  }[];
}
export interface CartItemProps {
  product: ProductProps;
  quantity: number;
}

export interface CategoryProps {
  _id: string;
  name: string;
  icon: string;
}
