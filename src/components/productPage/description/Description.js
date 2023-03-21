import React from 'react'
import { useSelector } from 'react-redux'
import { selectedProduct } from '../../../store/slices/productSlice'
import Accordeon from '../../../styledComponents/accordeon/Accordeon'
import estimate from '../../../assets/images/reviews/estimate-two.svg'
import s from './description.module.css'

function Description() {
    const {product} = useSelector(selectedProduct)

    const months = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const getEstimates = (count) => {
        let estimates = []

        for(let i = 0; i < count; i++) {
            estimates.push(<img src={estimate} alt='black-star' key={i}/>)
        }

        return estimates
    }

    const getMiddleEstimate = (reviews) => {
        return reviews?.reduce((prev, review) => prev + review.estimates, 0) / reviews?.length
    }

    return (
        <div className={s.main}>
            <div className={`container ${s.container}`}>
                <div className={s.photo__box}>
                    <img src={product.photos?.secondPhoto} alt="second-sneakers" />
                </div>
                <div className={s.descr__block}>
                    <div className={s.descr__box}>
                        <p className={s.descr}>{product?.description}</p>
                    </div>
                    <div className={s.details}>
                        <span>Отзывы({product.reviews?.length})</span>
                        <Accordeon 
                            head={
                                <div className={s.estimates__box}>
                                    {getEstimates(getMiddleEstimate(product.reviews))}
                                </div>
                            }
                            height='315px'
                        >
                            {product.reviews?.map(({
                                estimates, person, date, comment
                            }, key) =>
                                <div key={key} className={s.review}>
                                    <div className={s.review__details}>
                                        <div className={s.estimates__box}>
                                            {getEstimates(estimates)}
                                        </div>
                                        <span>{person} - {months[date.month]} {date.day}, {date.year}</span>
                                    </div>
                                    <div className={s.comment__box}>
                                        <p className={s.comment}>{comment}</p>
                                    </div>
                                </div>
                            )}
                        </Accordeon>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Description