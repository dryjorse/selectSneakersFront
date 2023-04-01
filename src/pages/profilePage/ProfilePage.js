import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Navigate, NavLink } from 'react-router-dom'
import { selectedUser, logout } from '../../store/slices/userSlice'
import Breadcrumbs from '../../styledComponents/breadcrumbs/Breadcrumbs'
import Button from '../../styledComponents/button/Button'
import { ReactComponent as ProfileBasket } from '../../assets/images/profile/profile-basket.svg'
import { ReactComponent as ProfileFavourites } from '../../assets/images/profile/profile-favourites.svg'
import { ReactComponent as Gift } from '../../assets/images/profile/gift.svg'
import s from './profilePage.module.css'

function ProfilePage() {
    const dispatch = useDispatch()
    const {user, isAuth} = useSelector(selectedUser)

    const logoutFunc = () => dispatch(logout())

    if(!isAuth) return <Navigate to='/auth/registration' />

    return (
        <div className={`page ${s.main}`}>
            <div className={`container`}>
                <Breadcrumbs />
                <div className={s.profile__box}>
                    <div className={s.profile__menu}>
                        <h2>Личный кабинет</h2>
                        <nav className={s.profile__nav}>
                            <NavLink className={s.link} to='/profile/my-data'>Мои данные</NavLink>
                            <NavLink className={s.link} to='/profile/my-orders'>Мои заказы</NavLink>
                            <NavLink className={s.link} to='/profile/tracking'>Где мой заказ?</NavLink>
                            <NavLink className={s.link} to='/auth/change-password'>Сменить пароль</NavLink>
                            <button className={s.link} onClick={logoutFunc} >Выйти</button>
                        </nav>
                    </div>
                    <div className={s.data}>
                        <h2>Мои данные</h2>
                        <div className={s.data__box}>
                            <div className={s.data__left}>
                                <div className={s.block}>
                                    <span className={s.data__title}>ФИО</span>
                                    <span className={s.data__text}>{user.name} {user.surname}</span>
                                </div>
                                <div className={s.block}>
                                    <span className={s.data__title}>E-mail</span>
                                    <span className={s.data__text}>{user.email}</span>
                                </div>
                                <div className={s.block}>
                                    <span className={s.data__title}>Телефон</span>
                                    <span className={s.data__text}>+996550555677</span>
                                </div>
                            </div>
                            <div className={s.data__middle}>
                                <div className={s.ava__box}>
                                    <img src={user.ava} alt="user-ava" />
                                </div>
                                <Button >Сохранить</Button>
                            </div>
                            <div className={s.data__right}>
                                <Link to='/basket' className={s.block}>
                                    <ProfileBasket />
                                    <span>Ваша корзина пуста</span>
                                </Link>
                                <Link to='/profile/favourites' className={s.block}>
                                    <ProfileFavourites />
                                    <span>Товаров: <span className={s.count}>0</span></span>
                                </Link>
                                <Link to='/bonuses' className={s.block}>
                                    <Gift />
                                    <span><span className={s.count__two}>0</span> бонусных баллов</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage