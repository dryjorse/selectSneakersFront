import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ReactComponent as Like } from '../../assets/images/card/like.svg';
import { ReactComponent as Basket } from '../../assets/images/card/basket.svg';
import { ReactComponent as Delete } from '../../assets/images/card/delete.svg';
import Button from '../button/Button';
import { selectedUser, updateUser } from '../../store/slices/userSlice';
import s from './card.module.css'

function Card({product, link}) {
    const dispatch = useDispatch()
    const {user, isAuth} = useSelector(selectedUser)
    const capitalize = name => name.split(' ').map(str => str[0] + str.slice(1)).join(' ') 

    const addToFavourites = (id) => {
        if(isAuth) {
            dispatch(updateUser({
                email: user.email,
                favouriteProducts: [...user.favouriteProducts, id]
            }))
        } else {
            alert('Войдите в аккаунт чтобы добавлять продукты в избранные')
        }
    }

    const deleteFromFavourites = (id) => {
        console.log(user.favouriteProducts, id);
        if(isAuth) {
            dispatch(updateUser({
                email: user.email,
                favouriteProducts: user.favouriteProducts.filter(product => product !== id)
            }))
        } else {
            alert('Войдите в аккаунт чтобы добавлять продукты в избранные')
        }
    }

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
                    {user.favouriteProducts?.includes(product.id) 
                        ? <button onClick={() => deleteFromFavourites(product.id)} className={s.like}><Delete /></button>
                        : <button onClick={() => addToFavourites(product.id)} className={s.like}><Like /></button>
                    }
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
                    <Button  pg={'6px 24px'}><Basket /></Button>
                </div>
            </div>
        </div>
    )
}

export default Card