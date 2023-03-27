import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts, selectedProducts } from '../../../store/slices/productsSlice'
import Card from '../../../styledComponents/card/Card'
import s from './products.module.css'

function Products() {
    const dispatch = useDispatch()
    const {products} = useSelector(selectedProducts)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <div className={`container ${s.container}`}>
            {products.length 
                ? <ul className={s.products__list}>
                    {products.map(product => 
                        <li key={product.id}>
                            <Card product={product}/>
                        </li>
                    )}
                </ul>
                : <span className={s.text}>Не найдено продуктов с данными параметрами</span>
            }
        </div>
    )
}

export default Products