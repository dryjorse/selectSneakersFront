import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useInput } from '../../../hooks/useInput'
import { loginWithEmail, selectedUser } from '../../../store/slices/userSlice'
import Button from '../../../styledComponents/button/Button'
import Input from '../../../styledComponents/input/Input'
import s from '../auth.module.css'

function ForgorPasswordPage() {
    const dispatch = useDispatch()
    const {isAuth, status} = useSelector(selectedUser)
    const email = useInput('', {isEmail: true, isEmpty: true})
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)

    useEffect(() => {
        setIsBtnDisabled(!email.inputValid || status === 'loading')
    }, [email.inputValid, status])

    const sendEmail = () => dispatch(loginWithEmail(email.value))

    if(isAuth) return <Navigate to='/profile/my-data' />

    return (
        <div className='page'>
            <div className={`${s.auth} ${s.container}`}>
                <div className={s.head}>
                    <h2 className='title'>Забыли пароль?</h2>
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
                        >E-mail</Input>
                    </div>
                    <div className={s.button__box}>
                        <Button click={sendEmail} disabled={isBtnDisabled}>Отправить</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgorPasswordPage