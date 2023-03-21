import React, { useEffect } from 'react'
import s from './reviews.module.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useDispatch, useSelector } from 'react-redux'
import { getReviews, selectedReviews } from '../../../store/slices/reviewsSlice'
import { Autoplay } from 'swiper'
import ReviewsCard from '../../../styledComponents/reviewsCard/reviewsCard'

function Reviews() {
    const dispatch = useDispatch()
    const {reviews, status} = useSelector(selectedReviews)

    useEffect(() => {
        if(!status) dispatch(getReviews())
    }, [dispatch, status])

    return (
        <div className={s.reviews}>
            <h2>Отзывы</h2>
            <div className={`container ${s.reviews__box}`}>
                <Swiper 
                    slidesPerView={3}
                    spaceBetween={50}
                    autoplay={{delay: 3000, disableOnInteraction: false}}
                    modules={[Autoplay]}
                >
                    {reviews.map((review, key) => 
                        <SwiperSlide key={key}>
                            <ReviewsCard review={review} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    )
}

export default Reviews