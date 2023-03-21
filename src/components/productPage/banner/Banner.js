import React from 'react'
import { useSelector } from 'react-redux'
import { selectedProduct } from '../../../store/slices/productSlice'
import s from './banner.module.css'

function Banner() {
    const {product} = useSelector(selectedProduct)

    return (
        <div className={s.main}>
            <div className={s.photo__box}>
                <div className={s.line}></div>
                <img src={product.photos?.banner} alt="big-sneakers" />
            </div>
            <span className={s.descr}>{product.descriptionTwo}</span>
        </div>
    )
}

export default Banner