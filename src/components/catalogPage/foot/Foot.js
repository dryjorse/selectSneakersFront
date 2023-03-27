import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectedFilter, setPage } from '../../../store/slices/filterSlice'
import { getProducts, setLimit } from '../../../store/slices/productsSlice'
import Pagination from '../../../styledComponents/pagination/Pagination'
import s from './foot.module.css'

function Foot() {
    const dispatch = useDispatch()
    const productsCount = useSelector(store => store.products.count)
    const productsLimit = useSelector(store => store.products.limit)
    const [visibleProductsCount, setVisibleProductsCount] = useState(24)
    const {page, categories, brands, sizes, seasons, colors, selectedColor, prices} = useSelector(selectedFilter)
    const getPagesCount = useCallback(() => Math.ceil(
        (visibleProductsCount < productsCount ? visibleProductsCount : productsCount) / 
        productsLimit
    ), [productsCount, productsLimit, visibleProductsCount])

    const handlePage = useCallback((newPage) => {
        dispatch(setPage(newPage))
    }, [dispatch])
  
    useEffect(() => {
        dispatch(getProducts({
            offset: (page - 1) * productsLimit,
            limit: productsLimit,
            category: categories.join(','),
            brand: brands.join(','),
            size: sizes.join(','),
            season: seasons.join(','),
            color: [...colors, selectedColor].join(','),
            minPrice: prices.find(price => price.def === 'from')?.price,
            maxPrice: prices.find(price => price.def === 'before')?.price,
        }))
    }, [page, productsLimit, dispatch])

    useEffect(() => {
        if(getPagesCount() > 1 && getPagesCount() < page) {
            handlePage(page - 1)
        }
    }, [visibleProductsCount, productsLimit, getPagesCount, handlePage, page])

    const handleLimit = () => {
        dispatch(setLimit(productsLimit + 4))
    }

    const handleVisibleProductsCount = () => {
        if(visibleProductsCount <= productsCount) {
            setVisibleProductsCount(count => count + productsLimit)
        }
    }

    return (
        <div className={`container ${s.foot}`}>
            {getPagesCount() > 1 && 
                <button onClick={handleLimit} className={s.more__btn}>Показать ещё</button>
            }
            <div className={s.line}></div>
            {productsLimit && getPagesCount() > 1 && <div className={s.pagination__box}>
                <Pagination 
                    page={page} 
                    limit={getPagesCount()} 
                    change={handlePage}
                />
                <button className={s.next} onClick={handleVisibleProductsCount}>Дальше</button>
            </div>}
        </div>
    )
}

export default Foot