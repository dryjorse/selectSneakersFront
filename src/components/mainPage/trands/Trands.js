import React, { useEffect } from 'react'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrands, selectedTrands } from '../../../store/slices/trandsSlice'
import Card from '../../../styledComponents/card/Card'
import Title from '../../../styledComponents/title/Title'
import s from './trands.module.css'
import 'swiper/css'

function Trands() {
    const dispatch = useDispatch()
    const {trands, status} = useSelector(selectedTrands)

    useEffect(() => {
        if(!status) dispatch(getTrands())
    }, [dispatch, status])

    return (
        <div className={s.trands}>
            <Title>Горящие тренды</Title>
            <div className={`container ${s.trands__content}`}>
                <Swiper 
                    spaceBetween={20}
                    slidesPerView={4}
                    autoplay={{delay: 3000, disableOnInteraction: false}}
                    modules={[Autoplay]}
                >
                    {trands.map((product) => 
                        <SwiperSlide key={product.id}>
                            <Card product={product} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    )
}

export default Trands