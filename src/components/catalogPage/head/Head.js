import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFilterItems, selectedFilter, setBrands, setCategories, setColors, setPrices, setSeasons, setSelectedColor, setSizes } from '../../../store/slices/filterSlice'
import InputBox from '../../../styledComponents/inputBox/InputBox'
import Tooltip from '../../../styledComponents/tooltip/Tooltip'
import {ReactComponent as CrossIcon} from '../../../assets/images/common/cross-icon.svg'
import s from './head.module.css'
import { getProducts } from '../../../store/slices/productsSlice'

function Head() {
    const dispatch = useDispatch()
    const filterStore = useSelector(selectedFilter)
    const pricesLimit = useSelector(store => store.products.pricesLimit)
    const [openedFilter, setOpenedFilter] = useState('')
    const [selectedPrices, setSelectedPrices] = useState({
        minPrice: '',
        maxPrice: '',
    })

    useEffect(() => {
        dispatch(getFilterItems())
    }, [dispatch])

    const filterData = [
        {
            name: 'categories',
            labelName: 'Категория',
            padding: '14px 39px',
            items: filterStore.filterItems.categories,
            itemsData: filterStore.categories,
        },
        {
            name: 'brands',
            labelName: 'Бренд',
            padding: '14px 37px',
            items: filterStore.filterItems.brands,
            itemsData: filterStore.brands,
        },
        {
            name: 'sizes',
            labelName: 'Размер',
            padding: '14px 32px',
            items: filterStore.filterItems.dimensions,
            itemsData: filterStore.sizes,
        }, 
        {
            name: 'seasons',
            labelName: 'Сезон',
            padding: '14px 32px',
            items: filterStore.filterItems.seasons,
            itemsData: filterStore.seasons,
        },
        {
            name: 'colors',
            labelName: 'Цвет',
            padding: '14px 25px',
            items: filterStore.filterItems.colors,
            itemsData: filterStore.colors,
        },
        {
            name: 'prices',
            labelName: 'Цена',
            padding: '14px 29px',
            items: [
                {
                    price: 5000,
                    def: 'before'
                },
                {
                    price: 8000,
                    def: 'before'
                },
                {
                    price: 10000,
                    def: 'from'
                }
            ],
            itemsData: filterStore.prices,
        },
    ]

    const handleOpenedFilter = (value) => {
        setOpenedFilter(value)
    }

    const onChangeFilter = ({target}) => {
        const priceInfo = target.dataset.infotwo
        const defInfo = target.dataset.infothree
        const filterType = target.dataset.cg
        const filterTypeData = filterStore[filterType]
        let newFilterItems = !priceInfo
            ? filterTypeData.includes(target.name) 
            ? filterTypeData.filter(categorie => categorie !== target.name)
            : [...filterTypeData, target.name] 
            : filterTypeData.some(item => item.price === priceInfo)
            ? filterTypeData.filter(price => price.price !== priceInfo)
            : [{price: priceInfo, def: defInfo}]

        if(priceInfo) {
            dispatch(setPrices(newFilterItems))
            return
        }

        switch(filterType) {
            case 'categories':
                dispatch(setCategories(newFilterItems))
                break;
            case 'brands':
                dispatch(setBrands(newFilterItems))
                break;
            case 'sizes':
                dispatch(setSizes(newFilterItems))
                break;
            case 'seasons':
                dispatch(setSeasons(newFilterItems))
                break;
            case 'colors':
                dispatch(setColors(newFilterItems))
                break;
            default:
        }        
    }

    const clearColors = () => {
        dispatch(setColors([]))
        setSelectedColor('')
    }

    const selectColor = ({target}) => {
        dispatch(setSelectedColor(target.value))
    }

    useEffect(() => {
        dispatch(setPrices([
            {
                def: 'from',
                price: selectedPrices.minPrice
            },
            {
                def: 'before',
                price: selectedPrices.maxPrice
            },
        ]))
    }, [selectedPrices, dispatch])

    const selectPrices = ({target}) => {
        setSelectedPrices(prices => {
            return {
                ...prices,
                [target.name]: target.value
            }
        })
    }

    const apply = () => {
        dispatch(getProducts({
            category: filterStore.categories.join(','),
            brand: filterStore.brands.join(','),
            size: filterStore.sizes.join(','),
            season: filterStore.seasons.join(','),
            color: [...filterStore.colors, filterStore.selectedColor].join(','),
            minPrice: filterStore.prices.find(price => price.def === 'from')?.price,
            maxPrice: filterStore.prices.find(price => price.def === 'before')?.price,
        }))
        console.log(filterStore);
    }

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
                            <Tooltip 
                                filterList
                                isActive={openedFilter}
                                type={data.name}
                            >
                                <div className={s.content + ' ' + s[data.name]}>
                                    <ul>
                                        {data.name === 'colors' && <li className={s.clear__color}>
                                            <button onClick={clearColors}><div><CrossIcon /></div></button>
                                        </li>}
                                        {data.name === 'prices' && <li className={s.select__price}>
                                            <div>
                                                <div>
                                                    <span>от</span>
                                                    <input 
                                                        type="number" 
                                                        name="minPrice"
                                                        value={selectedPrices.minPrice}
                                                        placeholder={pricesLimit.minPrice}
                                                        onMouseDown={e => e.stopPropagation()} 
                                                        onChange={selectPrices}                                    
                                                    />
                                                </div>
                                                <div>
                                                    <span>до</span>
                                                    <input 
                                                        type="number" 
                                                        name="maxPrice"
                                                        value={selectedPrices.maxPrice}
                                                        placeholder={pricesLimit.maxPrice} 
                                                        onMouseDown={e => e.stopPropagation()} 
                                                        onChange={selectPrices}                                    
                                                    />
                                                </div>
                                            </div>    
                                        </li>}
                                        {data.items?.map((list, key) =>{
                                            const label = list.name || (list.price && `price${key + 1}`) || list
                                            return <li key={key}>
                                                <InputBox
                                                    id={label + '' + (key + 1)}
                                                    change={onChangeFilter}
                                                    name={list.price ? 'prices' : label}
                                                    infoTwo={list.price}
                                                    infoThree={list.def}
                                                    cg={data.name}
                                                    isChecked={
                                                        list.price
                                                        ? data.itemsData?.some(price => +price.price === +list.price)
                                                        : data.itemsData?.includes(label + '')
                                                    }
                                                    inputType={'checkbox'}
                                                    type={
                                                        data.name === 'categories' 
                                                        ? 'ordinary'
                                                        : data.name === 'brands' || data.name === 'seasons'
                                                        ? 'checkbox'
                                                        : data.name === 'sizes' 
                                                        ? 'numbers' 
                                                        : data.name === 'prices' 
                                                        ? 'intermediate'
                                                        : data.name
                                                    }
                                                >
                                                    { list.labelName || list.name || (list.price &&
                                                        `${list.def === 'before' ? 'до' : 'от'} ${list.price} с`
                                                    ) || list }
                                                </InputBox>
                                            </li> 
                                        })}
                                        {data.name === 'colors' && <li className={s.select__color}>
                                            <input 
                                                id='select-color'
                                                type='color'
                                                value={filterStore.selectedColor}
                                                onChange={selectColor}
                                            />
                                            <label style={{background: filterStore.selectedColor}} className={s.select__label} htmlFor='select-color'>
                                                <label htmlFor='select-color'></label>
                                            </label>
                                        </li>}
                                    </ul>       
                                </div>
                                <button onClick={apply} className={s.apply}>Применить</button>
                            </Tooltip>
                        </li>  
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Head