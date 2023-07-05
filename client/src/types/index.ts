export interface OrdersProps {
  _id: string;
  table: string;
  status: "WAITING" | "IN_PRODUCTION" | "DONE";
  products: {
    _id: string;
    quantity: number;
    product: {
      category?: string;
      name: string;
      imagePath: string;
      price: number;
    };
  }[];
  finished?: boolean;
  createdAt?: string;
}

export interface TabProps {
  title: string;
  icon: string;
  tab: string;
}

export interface CategoryProps {
  _id?: string;
  name: string;
  icon: string;
}

export interface ProductProps {
  _id?: string;
  name: string;
  description: string;
  imagePath?: string;
  price: number;
  ingredients: {
    name?: string;
    icon?: string;
    _id?: string;
  }[];

  category: string;
}

export interface IngredientProps {
  name: string;
  icon: string;
  _id: string;
}

export interface UserProps {
  name: string;
  email: string;
  type: string;
  _id?: string;
  password?: string;
}
