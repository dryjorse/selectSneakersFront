import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSimilarProducts, selectedSimilarProducts } from '../../../store/slices/similarSlice'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper'
import Title from '../../../styledComponents/title/Title'
import Card from '../../../styledComponents/card/Card'
import s from './similar.module.css'
import 'swiper/css'

function Similar() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const {products, status} = useSelector(selectedSimilarProducts)

    useEffect(() => {
        !status && dispatch(getSimilarProducts(id))
    }, [dispatch, id, status])

    return (
        <div className={s.main}>
            <Title>Похожие товары</Title>
            <div className={`container ${s.container}`}>
                <Swiper 
                    spaceBetween={22}
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
            </div>
        </div>
    )
}

export default Similar