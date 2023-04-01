import React, { useState } from 'react'
import s from './header.module.css'
import { ReactComponent as Logo } from '../../assets/images/common/logo.svg'
import { ReactComponent as ProfileIcon } from '../../assets/images/header/profile.svg'
import { ReactComponent as FavouritesIcon } from '../../assets/images/header/favourites.svg'
import { ReactComponent as BasketIcon } from '../../assets/images/header/basket.svg'
import { ReactComponent as SearchIcon } from '../../assets/images/header/search.svg'
import { Link, NavLink } from 'react-router-dom'
import Input from '../../styledComponents/input/Input'
import SeacrhTooltip from '../../styledComponents/searchTooltip/SeacrhTooltip'
import { useDispatch } from 'react-redux'
import { getSearchedProducts } from '../../store/slices/searchSlice'
import { useInput } from '../../hooks/useInput'

function Header() {
    const dispatch = useDispatch()
    const searchValue = useInput('')
    const [isSearchInpFocused, setIsSearchInpFocused] = useState(false)

    const onChangeSearchInpit = (e) => {
        dispatch(getSearchedProducts(e.target.value))
        searchValue.onChange(e)
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
                        <NavLink to={'/catalog?type=man'}>Мужские</NavLink>
                        <NavLink to={'/catalog?type=woman'}>Женские</NavLink>
                        <NavLink to={'/catalog?type=news'}>Новинки</NavLink>
                    </nav>
                    <Input 
                        value={searchValue.value}
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
                        <Link to={'/profile/my-data'}><ProfileIcon /></Link>
                        <Link to={'/profile/favourites'}><FavouritesIcon /></Link>
                        <Link to={'/basket'}><BasketIcon /></Link>
                    </nav>
                </div>
            </div>
            <div className={s.bottom__line}></div>
        </header>
    )
}

export default Header