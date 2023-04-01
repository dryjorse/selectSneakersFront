import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useInput } from '../../../hooks/useInput'
import { updateUser, selectedUser } from '../../../store/slices/userSlice'
import Button from '../../../styledComponents/button/Button'
import Input from '../../../styledComponents/input/Input'
import s from '../auth.module.css'

function ChangePasswordPage() {
    const dispatch = useDispatch()
    const {isAuth, user, status} = useSelector(selectedUser)
    const currPassword = useInput('', {isEmpty: true, minLength: 5})
    const newPassword = useInput('', {isEmpty: true, minLength: 5})
    const confirmPassword = useInput('', {isEmpty: true, minLength: 5, confirmTo: newPassword.value})
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        setIsValid(
            currPassword.inputValid &&
            newPassword.inputValid &&
            confirmPassword.inputValid
        )
    }, [
        currPassword.inputValid, 
        newPassword.inputValid,
        confirmPassword.inputValid,
    ]) 

    useEffect(() => {
        setIsBtnDisabled(!isValid || status === 'loading')
    }, [isValid, status])

    const changePasswordFunc = () => dispatch(updateUser({
        email: user.email,
        password: currPassword.value,
        newPassword: newPassword.value,
    }))

    if(!isAuth) return <Navigate to='/auth/registration' />

    return (
        <div className='page'>
            <div className={`${s.auth} ${s.container}`}>
                <div className={s.head}>
                    <h2 className='title'>Изменить пароль</h2>
                    <span>Введите свои данные чтобы продолжить</span>
                </div>
                <form onSubmit={e => e.preventDefault()} className={s.form}>
                    <div className={s.inputs}>
                        <Input
                            type="password" 
                            value={currPassword.value}
                            inputS={s.form__input}
                            change={currPassword.onChange}
                            blur={currPassword.onBlur}
                            isError={currPassword.errorMsg}
                            isPassword
                        >Текущий пароль</Input>
                        <Input 
                            type="password"
                            value={newPassword.value}
                            inputS={s.form__input}
                            change={newPassword.onChange}
                            blur={newPassword.onBlur}
                            isError={newPassword.errorMsg}
                            isPassword
                        >Новый пароль</Input>
                        <Input 
                            type="password"
                            value={confirmPassword.value}
                            inputS={s.form__input}
                            change={confirmPassword.onChange}
                            blur={confirmPassword.onBlur}
                            isError={confirmPassword.errorMsg}
                            isPassword
                        >Подвтердите пароль</Input>
                    </div>
                    <div className={s.button__box}>
                        <Button click={changePasswordFunc} disabled={isBtnDisabled}>Изменить пароль</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ChangePasswordPage