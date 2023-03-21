import React from 'react'
import s from './footer.module.css'
import { Link } from 'react-router-dom'
import { ReactComponent as Facebook } from '../../assets/images/footer/facebook.svg'
import { ReactComponent as Whatsapp } from '../../assets/images/footer/whatsapp.svg'
import { ReactComponent as Instagram } from '../../assets/images/footer/instagram.svg'
import { ReactComponent as Logo } from '../../assets/images/common/logo.svg'
import Input from '../../styledComponents/input/Input'
import Button from '../../styledComponents/button/Button'

function Footer() {
    return (
        <footer className={s.footer}>
            <div className='container'>
                <div className={s.links__box}>
                    <div className={s.links}>
                        <ul>
                            <li><Link to={'/reviews'}>Отзывы</Link></li>
                            <li><Link to={'/promos'}>Промокоды</Link></li>
                            <li><Link to={'/delivery'}>Доставка</Link></li>
                        </ul>
                    </div>
                    <div className={s.links}>
                        <ul>
                            <li><Link to={'/tracking'}>Отслеживание</Link></li>
                            <li><Link to={'/return'}>Возврат</Link></li>
                            <li><Link to={'/payment'}>Способ оплаты</Link></li>
                        </ul>
                    </div>
                    <div className={s.links}>
                        <ul>
                            <li>
                                <a 
                                    target="_blank" 
                                    rel="noreferrer"
                                    href="https://2gis.kg/bishkek/geo/15763234351106546"
                                >г.Бишкек ул. Ибраева 4</a>
                            </li>
                            <li><a href="tel:+9967770070707">+9967770070707</a></li>
                            <li><a href="mailto:select@gmail.com">select@gmail.com</a></li>
                        </ul>
                    </div>
                    <div className={s.links}>
                        <ul>
                            <li><a target="_blank" rel="noreferrer" href="https://www.facebook.com/"><Facebook /></a></li>
                            <li><a target="_blank" rel="noreferrer" href="https://web.whatsapp.com/"><Whatsapp /></a></li>
                            <li><a target="_blank" rel="noreferrer" href="https://www.instagram.com/"><Instagram /></a></li>
                        </ul>
                    </div>
                </div>
                <form 
                    className={s.input__box}
                    onSubmit={e => e.preventDefault()} 
                >
                    <Input 
                        type='email' 
                        rightElem={<Button >Подписаться</Button>}
                    >Введите ваш Email</Input>
                </form>
                <div className={s.end}>
                    <span></span>
                    <span>Powered by  Select 2023 </span>
                    <Logo />
                </div>
            </div>
        </footer>
    )
}

export default Footer