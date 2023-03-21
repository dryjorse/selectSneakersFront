import React, { useEffect, useState } from 'react'
import s from './news.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getNews, selectedNews } from '../../../store/slices/newsSlice'
import Text from '../../../styledComponents/text/Text'

function News() {
    const dispatch = useDispatch()
    const {news, status} = useSelector(selectedNews)
    const [newsImageId, setNewsImageId] = useState(0)

    useEffect(() => {
        if(!status) dispatch(getNews())
    }, [dispatch, status])
    
    useEffect(() => {
      let imgInterval = setInterval(() => {
        news.images && setNewsImageId(id => id < news.images.length - 1 ? id + 1 : 0)
      }, 1000)
        
      return () => {
        clearInterval(imgInterval)
      }
    }, [news])

    return (
        <div className={s.news}>
            <div className={`container ${s.container}`}>
              <div className={s.newsLeft}>
                  <h1>{news?.title}</h1>
                  <Text color='gray'>{news?.description}</Text>
              </div>
              <div className={s.newsRight}>
                  {news.images?.map((img, key) => 
                      <img 
                          key={key} 
                          src={img} 
                          alt="boots" 
                          className={key === newsImageId ? s.active : undefined}
                      />
                  )}
              </div>
            </div>
        </div>
    )
}

export default News