import CatalogPage from "../pages/catalogPage/CatalogPage";
import MainPage from "../pages/mainPage/MainPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import ProductPage from "../pages/productPage/ProductPage";

export const routes = [
    {path: '*', elem: <NotFoundPage />, id: 1},
    {path: '/', elem: <MainPage />, id: 2},
    {path: '/catalog/:id', elem: <ProductPage />, id: 3},
    {path: '/catalog', elem: <CatalogPage />, id: 4},
]