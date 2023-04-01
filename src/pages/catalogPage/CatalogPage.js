import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Foot from '../../components/catalogPage/foot/Foot'
import Head from '../../components/catalogPage/head/Head'
import Products from '../../components/catalogPage/products/Products'
import ErrorPage from '../errorPage/ErrorPage'
import LoadinPage from '../loadingPage/LoadinPage'

function CatalogPage() {
    const productsStatus = useSelector(store => store.products.status)
    const filterItemsStatus = useSelector(store => store.filter.status)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [])

    if(
        productsStatus === 'loading' || 
        filterItemsStatus === 'loading'
    ) {
        return <LoadinPage />
    } else if(
        productsStatus === 'rejected' || 
        filterItemsStatus === 'rejected'
    ) {
        return <ErrorPage />
    }

    return (
        <section className='page'>
            <Head />
            <Products />
            <Foot />
        </section>
    )
}

export default CatalogPage