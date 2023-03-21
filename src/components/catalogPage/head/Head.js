import React, { useState } from 'react'
import s from './head.module.css'

function Head() {
    const [openedFilter, setOpenedFilter] = useState('')

    const filterData = [
        {
            name: 'category',
            labelName: 'Категория',
            padding: '14px 39px',

        },
        {
            name: 'brand',
            labelName: 'Бренд',
            padding: '14px 37px'
        },
        {
            name: 'size',
            labelName: 'Размер',
            padding: '14px 32px'
        }, 
        {
            name: 'season',
            labelName: 'Сезон',
            padding: '14px 32px'
        },
        {
            name: 'color',
            labelName: 'Цвет',
            padding: '14px 25px'
        },
        {
            name: 'price',
            labelName: 'Цена',
            padding: '14px 29px'
        },
    ]

    const handleOpenedFilter = (value) => {
        setOpenedFilter(value)
    }
    console.log(openedFilter);

    return (
        <div className={s.head}>
            <div className={s.top}>
                <span>Скидка 20% при активации <br/> промокода</span>
            </div>
            <div className={`container ${s.container}`}>
                <ul className={s.filter__list}>
                    {filterData.map((data, key) => 
                        <li 
                            key={key} 
                            className={s.filter__wrapper}
                            onFocus={() => handleOpenedFilter(data.name)}
                            onBlur={() => handleOpenedFilter('')}
                        >
                            <button 
                                style={{padding: data.padding}}
                                className={s.filter__btn}
                            >{data.labelName}</button>
                            <div 
                                className={`${s.filter__box} ${openedFilter === data.name ? s.active : undefined}`}
                            >
                                <p>eded</p>
                                <button className={s.apply}>Применить</button>
                            </div>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Head