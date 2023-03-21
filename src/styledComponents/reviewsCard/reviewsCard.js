import React from 'react'
import s from './reviewsCard.module.css'
import { ReactComponent as Estimate } from '../../assets/images/reviews/estimate.svg'

function ReviewsCard({review}) {
    
    const getEstimates = () => {
        let estimates = []

        for(let i = 0; i < review.estimates; i++) {
            estimates.push(<Estimate key={i}/>)
        }

        return estimates
    }

    return (
        <div className={s.card}>
            <div className={s.info}>
                <img src={review.photo} alt="review-ava" />
                <div className={s.info__box}>
                    <span className={s.name}>{review.name}</span>
                    <div className={s.estimates__box}>
                        {getEstimates()}
                    </div>
                </div>
            </div>
            <div className={s.comment__box}>
                <p className={s.comment}>{review.comment}</p>
            </div>
        </div>
    )
}

export default ReviewsCard