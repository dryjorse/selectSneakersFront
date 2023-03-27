import React, { useEffect } from 'react'
import Foot from '../../components/catalogPage/foot/Foot'
import Head from '../../components/catalogPage/head/Head'
import Products from '../../components/catalogPage/products/Products'

function CatalogPage() {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
        })
    }, [])

    return (
        <section className='page'>
            <Head />
            <Products />
            <Foot />
        </section>
    )
}

export default CatalogPage