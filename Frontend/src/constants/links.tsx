import { AllMarketProductsPage } from "../pages/all-market-products";
import { AllMarketsPage } from "../pages/all-markets";
import { AllOrdersPage } from "../pages/all-orders";
import { AllProductsPage } from "../pages/all-products";
import { AllQueriesPage } from "../pages/all-queries";
import { AllStoresPage } from "../pages/all-stores";
import { AllUsersPage } from "../pages/all-users";

export const LINKS = [
  { label: "Пользователи", href: "/users", component: <AllUsersPage /> },
  { label: "Заказы", href: "/orders", component: <AllOrdersPage /> },
  { label: "Магазины", href: "/markets", component: <AllMarketsPage /> },
  { label: "Склады", href: "/stores", component: <AllStoresPage /> },
  { label: "Продукты", href: "/products", component: <AllProductsPage /> },
  { label: "Продукты магазинов", href: "/market_products", component: <AllMarketProductsPage /> },
  { label: "Запросы", href: "/queries", component: <AllQueriesPage /> },
] as const;
