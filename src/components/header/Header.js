import React, { useState } from 'react'
import s from './header.module.css'
import { ReactComponent as Logo } from '../../assets/images/common/logo.svg'
import { ReactComponent as ProfileIcon } from '../../assets/images/header/profile.svg'
import { ReactComponent as FavouritesIcon } from '../../assets/images/header/favourites.svg'
import { ReactComponent as BasketIcon } from '../../assets/images/header/basket.svg'
import { ReactComponent as SearchIcon } from '../../assets/images/header/search.svg'
import { Link } from 'react-router-dom'
import Input from '../../styledComponents/input/Input'
import SeacrhTooltip from '../../styledComponents/searchTooltip/SeacrhTooltip'
import { useDispatch } from 'react-redux'
import { getSearchedProducts } from '../../store/slices/searchSlice'

function Header() {
    const dispatch = useDispatch()
    const [isSearchInpFocused, setIsSearchInpFocused] = useState(false)

    const onChangeSearchInpit = ({target}) => {
        dispatch(getSearchedProducts(target.value))
    }

    const handleSearchInpFocused = ({target}) => {
        setIsSearchInpFocused(bool => {
            !bool && dispatch(getSearchedProducts(target.value))
            return !bool
        })
    }


    return (
        <header>
            <div className='container'>
                <nav className={s.nav}>
                    <Link to={'/'}><Logo /></Link>
                    <ul>
                        <li><Link to={'/delivery'}>Доставка и оплата</Link></li>
                        <li><Link to={'/contacts'}>Контакты</Link></li>
                    </ul>
                    <div></div>
                </nav>
                <div className={s.bottom}>
                    <nav className={s.first__nav}>
                        <Link to={'/catalog'}>Мужские</Link>
                        <Link to={'/catalog'}>Женские</Link>
                        <Link to={'/catalog'}>Новинки</Link>
                    </nav>
                    <Input 
                        change={onChangeSearchInpit}
                        focus={handleSearchInpFocused}
                        blur={handleSearchInpFocused}
                        leftIcon={
                            <SearchIcon 
                                width={'36px'} 
                                style={{
                                    flexShrink: 0,
                                    marginLeft: '12px'
                                }}
                            />
                        }
                        tooltip={<SeacrhTooltip isActive={isSearchInpFocused} />}
                    ></Input>
                    <nav className={s.second__nav}>
                        <Link to={'/profile'}><ProfileIcon /></Link>
                        <Link to={'/favourites'}><FavouritesIcon /></Link>
                        <Link to={'/basket'}><BasketIcon /></Link>
                    </nav>
                </div>
            </div>
            <div className={s.bottom__line}></div>
        </header>
    )
}

export default Header