import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../../store/slices/productSlice'
import Main from '../../components/productPage/main/Main'
import Description from '../../components/productPage/description/Description'
import Banner from '../../components/productPage/banner/Banner'
import Similar from '../../components/productPage/similar/Similar'
import LoadinPage from '../loadingPage/LoadinPage'
import ErrorPage from '../errorPage/ErrorPage'

function ProductPage() {
    const dispatch = useDispatch()
    const {id} = useParams()
    const productStatus = useSelector(store => store.product.status)
    const similarStatus = useSelector(store => store.similar.status)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
        dispatch(getProduct([id]))
    }, [dispatch, id])

    if(productStatus === 'loading' || similarStatus === 'loading') {
        return <LoadinPage />
    } else if(productStatus === 'rejected' || similarStatus === 'rejected') {
        return <ErrorPage />
    }

    return (
        <section className='page'>
            <Main />
            <Description />
            <Banner />
            <Similar />
        </section>
    )
}

export default ProductPage