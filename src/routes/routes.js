import Auth from "../pages/auth/Auth";
import CatalogPage from "../pages/catalogPage/CatalogPage";
import MainPage from "../pages/mainPage/MainPage";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import ProductPage from "../pages/productPage/ProductPage";
import FavouritesPage from "../pages/profilePage/FavouritesPage";
import Profile from "../pages/profilePage/Profile";
import ProfilePage from "../pages/profilePage/ProfilePage";

export const routes = [
    {path: '*', elem: <NotFoundPage />, id: 1},
    {path: '/', elem: <MainPage />, id: 2},
    {path: '/catalog/:id', elem: <ProductPage />, id: 3},
    {path: '/catalog', elem: <CatalogPage />, id: 4},
    {path: '/profile/*', elem: <Profile />, text: 'Личный кабинет', id: 5},
    {path: '/auth/*', elem: <Auth />, id: 6},
]

export const profileRouter = [
    {path: '*', elem: <NotFoundPage />, id: 'profile 1'},
    {path: '/my-data', elem: <ProfilePage />, text: 'Мои данные', id: 'profile 2'},
    {path: '/favourites', elem: <FavouritesPage />, text: 'Избранное', id: 'profile 3'},
]