import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Gif from '../../components/mainPage/gif/Gif';
import News from '../../components/mainPage/news/News';
import Reasons from '../../components/mainPage/reasons/Reasons';
import Reviews from '../../components/mainPage/reviews/Reviews';
import Trands from '../../components/mainPage/trands/Trands';
import ErrorPage from '../errorPage/ErrorPage';
import LoadinPage from '../loadingPage/LoadinPage';


function MainPage() {
  const newsStatus = useSelector(store => store.news.status)
  const gifsStatus = useSelector(store => store.gifs.status)
  const trandsStatus = useSelector(store => store.trands.status)
  const reviewsStatus = useSelector(store => store.reviews.status)

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [])

  if(
    newsStatus === 'loading' ||
    gifsStatus === 'loading' ||
    trandsStatus === 'loading' ||
    reviewsStatus === 'loading'
  ) {
    return <LoadinPage />
  } else if(
    newsStatus === 'rejected' ||
    gifsStatus === 'rejected' ||
    trandsStatus === 'rejected' ||
    reviewsStatus === 'rejected'
  ) {
    return <ErrorPage />
  }

  return (
    <section className='page'>
      <News />
      <Gif />
      <Reasons />
      <Trands />
      <Reviews />
    </section>
  )
}

export default MainPage