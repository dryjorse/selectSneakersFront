import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useInput } from '../../../hooks/useInput'
import { loginThunk, selectedUser } from '../../../store/slices/userSlice'
import Button from '../../../styledComponents/button/Button'
import Input from '../../../styledComponents/input/Input'
import InputBox from '../../../styledComponents/inputBox/InputBox'
import { ReactComponent as Google } from '../../../assets/images/auth/google.svg'
import { ReactComponent as Facebook } from '../../../assets/images/auth/facebook.svg'
import s from '../auth.module.css'

function LoginPage() {
    const dispatch = useDispatch()
    const {status, isAuth} = useSelector(selectedUser)
    const email = useInput('', {isEmpty: true, isEmail: false})
    const password = useInput('', {isEmpty: true, minLength: 5})
    const [isRemembered, setIsRemembered] = useState(false)
    const [isValid, setIsValid] = useState(false)
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)

    useEffect(() => {
        setIsValid(
            email.inputValid &&
            password.inputValid
        )
    }, [
        email.inputValid, 
        password.inputValid,
    ]) 

    useEffect(() => {
        setIsBtnDisabled(!isValid || status === 'loading')
    }, [isValid, status])

    const handleIsRemembered = () => setIsRemembered(bool => !bool)

    const login = () => {
        dispatch(loginThunk({
            email: email.value,
            password: password.value,
            isRemembered,
        }))
    }

    if(isAuth) return <Navigate to="/profile/my-data" />

    return (
        <div className='page'>
            <div className={`${s.auth} ${s.container}`}>
                <div className={s.head}>
                    <h2 className='title'>Авторизация</h2>
                    <span>Введите свои данные чтобы продолжить</span>
                </div>
                <form onSubmit={e => e.preventDefault()} className={s.form}>
                    <div className={s.inputs}>
                        <Input
                            type="email" 
                            value={email.value}
                            inputS={s.form__input}
                            change={email.onChange}
                            blur={email.onBlur}
                            isError={email.errorMsg}
                        >Email</Input>
                        <Input 
                            type="password"
                            value={password.value}
                            inputS={s.form__input}
                            change={password.onChange}
                            blur={password.onBlur}
                            isError={password.errorMsg}
                            isPassword
                        >Пароль</Input>
                    </div>
                    <div className={s.middleware__block}>
                        <div className={s.check__two}>
                            <InputBox
                                inputType='checkbox'
                                isChecked={isRemembered} 
                                change={handleIsRemembered} 
                                id='remember-me' 
                                type='checkbox'
                            />
                            <label className={s.small__two} htmlFor='remember-me'>Запомнить меня</label>
                        </div>
                        <Link className={s.link} to={'/auth/forgot-password'} >Забыли пароль?</Link>
                    </div>
                    <div className={s.button__box}>
                        <Button click={login} disabled={isBtnDisabled}>Войти</Button>
                    </div>
                    <div className={s.browsers}>
                        <div className={s.browsers__top}>
                            <div className={s.line}></div>
                            <span>Или</span>
                            <div className={s.line}></div>
                        </div>
                        <div className={s.links}>
                            <a rel="noreferrer" target="_blank" href="http://www.google.com/"><Google /></a>
                            <a rel="noreferrer" target="_blank" href="https://www.facebook.com/"><Facebook /></a>
                        </div>
                    </div>
                </form>
                <div className={s.bottom}>
                    <span className={s.help__link}>Еще нет личного кабинета? <Link to={'/auth/registration'} className={s.link}> Зарегстрируйтесь</Link></span>
                </div>
            </div>
        </div>
    )
}

export default LoginPage