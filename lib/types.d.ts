type ProductType = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: [string];
};

type CategoryType = {
  id: number;
  name: string;
  image: string;
  products: ProductType[];
};
