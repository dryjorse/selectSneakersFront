import React from 'react'
import s from './card.module.css'
import { ReactComponent as Like } from '../../assets/images/card/like.svg';
import { ReactComponent as Basket } from '../../assets/images/card/basket.svg';
import Button from '../button/Button';

function Card({product, link}) {
    const capitalize = name => name.split(' ').map(str => str[0] + str.slice(1)).join(' ') 

    return (
        <div className={s.card}>
            <div 
                className={s.photo} 
                style={{background: `url(${product.photos.card})`}}
            >
                <div className={s.name__box}>
                    <span className={s.name}>{capitalize(product.name)}</span>
                </div>
                <div className={s.inner__box}>
                    <button className={s.like}><Like /></button>
                    <span className={s.price}>{product.price} c</span>
                </div>
            </div>
            <div className={s.outer__box}>
                <div className={s.details}>
                    <div className={s.detail__box}>
                        <span className={s.detail__name}>Размеры в наличии:</span>
                        <div className={s.sizes}>
                            {product.dimensions.map((size, key) => 
                                <span key={key} className={s.size}>{size}</span>
                            )}
                        </div>
                    </div>
                    <div className={s.detail__box}>
                        <span className={s.detail__name}>Цвета:</span>
                        <div className={s.colors}>
                            {product.colors.map((color, key) =>
                                <span key={key} className={s.color__wrapper}>
                                    <div
                                        className={s.color}
                                        style={{backgroundColor: color}}
                                    ></div>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className={s.links}>
                    <Button link={link || `/catalog/${product.id}`}>Подробнее</Button>
                    <Button link={`/basket`} pg={'6px 24px'}><Basket /></Button>
                </div>
            </div>
        </div>
    )
}

export default Card