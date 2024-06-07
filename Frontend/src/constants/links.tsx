import { AllMarketProductsPage } from "../pages/all-market-products";
import { AllMarketsPage } from "../pages/all-markets";
import { AllProductsPage } from "../pages/all-products";
import { AllStoresPage } from "../pages/all-stores";
import { AllUsersPage } from "../pages/all-users";

export const LINKS = [
  { label: "Пользователи", href: "/users", component: <AllUsersPage /> },
  { label: "Магазины", href: "/markets", component: <AllMarketsPage /> },
  { label: "Склады", href: "/stores", component: <AllStoresPage /> },
  { label: "Продукты", href: "/products", component: <AllProductsPage /> },
  { label: "Продукты магазинов", href: "/market_products", component: <AllMarketProductsPage /> },
] as const;
