export type Product = {
  name: string;
  price: number;
  image: string;
  badge?: string;
};

export const featuredProducts: Product[] = [
  { name: "Court Lite Footwear", price: 89, image: "/products/court-lite.png" },
  { name: "Velocity Runner", price: 110, image: "/products/velocity-runner.png" },
  { name: "Urban Pro Footwear", price: 95, image: "/products/urban-pro.png" },
  { name: "Nova Footwear", price: 89, image: "/products/nova-footwear.png" },
];

export const bestSellers: Product[] = [
  { name: "Air Jordan 1 Retro High", price: 180, image: "/products/air-jordan-retro.png", badge: "BEST SELLER" },
  { name: "Stan Smith Footwear", price: 89, image: "/products/stan-smith.png" },
  { name: "New Balance 9060", price: 150, image: "/products/new-balance-9060.png" },
  { name: "Ultraboost 1.0", price: 180, image: "/products/ultraboost-1.png" },
  { name: "Air Max 270", price: 150, image: "/products/air-max-270.png" },
  { name: "Yeezy Boost 350", price: 230, image: "/products/yeezy-boost-350.png" },
  { name: "Dunk Low Retro", price: 120, image: "/products/dunk-low-retro-v2.png" },
];

export const money = (price: number) => `$${price.toFixed(2)}`;
