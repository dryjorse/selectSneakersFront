import React, { useEffect } from 'react'
import s from './gif.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getGifs, selectedGif } from '../../../store/slices/gifsSlice'


function Gif() {
    const dispatch = useDispatch()
    const {gifs, status} = useSelector(selectedGif)

    useEffect(() => {
        if(!status) dispatch(getGifs())
    }, [dispatch, status])

    return (
        <div>
            <figure className={s.gif}>
                <a rel="noreferrer" target='_blank' href={gifs[0]?.link}>
                    <img src={gifs[0]?.gif} alt="gif" />
                </a>
            </figure>
        </div>
    )
}

export default Gif