import { OrdersProps } from "./types";

export const orders: OrdersProps[] = [
  {
    _id: "6372e48cbcd195b0d3d0f7f3",
    table: "1",
    status: "WAITING",
    products: [
      {
        product: {
          name: "Pizza quatro queijos",
          imagePath: "1686942034620-quatro-queijos.png",
          price: 40,
        },
        quantity: 3,
        _id: "6372e48cbcd195b0d3d0f7f4",
      },
      {
        product: {
          name: "Coca cola",
          imagePath: "1686942580670-coca-cola.png",
          price: 7,
        },
        quantity: 2,
        _id: "6372e48cbcd195b0d3d0f7f5",
      },
    ],
  },
];
