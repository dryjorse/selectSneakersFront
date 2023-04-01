import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import  { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getFavouriteProducts, selectedFavourites } from '../../store/slices/favouritesSlice'
import { selectedUser } from '../../store/slices/userSlice'
import Breadcrumbs from '../../styledComponents/breadcrumbs/Breadcrumbs'
import LoadinPage from '../loadingPage/LoadinPage'
import s from './profilePage.module.css'
import 'swiper/css'
import Card from '../../styledComponents/card/Card'

function FavouritesPage() {
    const dispatch = useDispatch()
    const userData = useSelector(selectedUser)
    const {products, status} = useSelector(selectedFavourites)

    useEffect(() => {
        userData.user.favouriteProducts && dispatch(getFavouriteProducts(userData.user.favouriteProducts))
    }, [userData.user, dispatch])

    if(!userData.isAuth && userData.status) return <Navigate to='/auth/registration' />
    if(status === 'loading') return <LoadinPage />

    return (
        <div className={`page ${s.main} ${s.favourites}`}>
            <div className={`container`}>
                <Breadcrumbs />
                <h2 className='title'>Избранное</h2>
                <div className={s.favourites__products}>
                    {products.length 
                        ? <Swiper 
                            spaceBetween={20}
                            slidesPerView={4}
                            autoplay={{delay: 3000, disableOnInteraction: false}}
                            modules={[Autoplay]}
                        >
                            {products?.map(product => 
                                <SwiperSlide key={product.id} >
                                    <Card product={product} />
                                </SwiperSlide>    
                            )}
                        </Swiper>
                        : <p>Пусто</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default FavouritesPage