import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { setType } from '../../../store/slices/filterSlice'
import { getProducts, selectedProducts } from '../../../store/slices/productsSlice'
import Card from '../../../styledComponents/card/Card'
import s from './products.module.css'

function Products() {
    const location = useLocation()
    const dispatch = useDispatch()
    
    const {products, status} = useSelector(selectedProducts)

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        const type = queryParams.get('type')
        dispatch(setType(type || ''))
        if(!status) dispatch(getProducts({type}))
    }, [dispatch, location.search, status])

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
                : status && <span className={s.text}>Не найдено продуктов с данными параметрами</span>
            }
        </div>
    )
}

export default Products