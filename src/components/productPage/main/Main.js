import React, { useEffect, useState } from 'react'
import s from './main.module.css'
import {useSelector} from 'react-redux'
import { selectedProduct } from '../../../store/slices/productSlice'
import Button from '../../../styledComponents/button/Button'
import { ReactComponent as Basket } from '../../../assets/images/card/basket.svg';

function Main() {
    const {product} = useSelector(selectedProduct)
    const [activePhoto, setActivePhoto] = useState(0)

    useEffect(() => {
        const photosInterval = setInterval(() => {
            setActivePhoto(photoId => {
                return photoId < product.photos?.slider.length - 1
                    ? photoId + 1
                    : 0
            }) 
        }, 1500)

        return () => {
            clearInterval(photosInterval)
        }
    }, [product])

    const getDiscount = (price, percent) => {
        return price ? ((price * percent / 100) + '').slice(0, 2) + '0'.repeat((price + '').length - 2) : 0
    }
    
    return (
        <div className={s.main}>
            <div className={`container ${s.container}`}>
                <div className={s.slider}>
                    {product.photos?.slider?.map((photo, key) => 
                        <img 
                            key={key + 1} 
                            className={activePhoto === key ? s.active : undefined} 
                            src={photo} 
                            alt="product" 
                        />
                    )}
                </div>
                <div className={s.info}>
                    <h2>Кроссовки {product.name}</h2>
                    <span className={s.vendor}>Артикул {product.vendor}</span>
                    <div className={s.colors}>
                        <span>Цвета</span>
                        <div className={s.colors__box}>
                            {product.colors?.map((color, key) =>
                                <span key={key} className={s.color__wrapper}>
                                    <div
                                        className={s.color}
                                        style={{backgroundColor: color}}
                                    ></div>
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={s.details}>
                        <div className={s.sizes}>
                            <span>Размеры в наличии:</span>
                            <div className={s.sizes__box}>
                                {product.dimensions?.map((size, key) => 
                                    <span key={key} className={s.size}>{size}</span>
                                )}
                            </div>
                        </div>
                        <div className={s.price__box}>
                            <div className={s.price__wrapper}>
                                <span className={s.price}>{getDiscount(product.price, 92)} c</span>
                                <span className={s.init__price}>{product.price} c</span>
                            </div>
                        </div>
                    </div>
                    <div className={s.buttons}>
                        <Button link='/ordering' pg='20px 44px'>Купить</Button>
                        <div className={s.busket__box}>
                            <Button link='/basket' pg='8px 31px'><Basket /></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main