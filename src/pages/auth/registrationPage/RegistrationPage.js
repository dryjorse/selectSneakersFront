import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { useInput } from '../../../hooks/useInput'
import { registration, selectedUser } from '../../../store/slices/userSlice'
import Button from '../../../styledComponents/button/Button'
import Input from '../../../styledComponents/input/Input'
import InputBox from '../../../styledComponents/inputBox/InputBox'
import s from '../auth.module.css'

function RegistrationPage() {
    const dispatch = useDispatch()
    const {status, isAuth} = useSelector(selectedUser)
    const email = useInput('', {isEmpty: true, isEmail: false})
    const name = useInput('', {isEmpty: true, minLength: 2, isSWBL: true,})
    const surname = useInput('', {isEmpty: true, minLength: 4, isSWBL: true,})
    const password = useInput('', {isEmpty: true, minLength: 5})
    const passwordConfirm = useInput('', {isEmpty: true, minLength: 5, confirmTo: password.value})
    const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
    const [isBtnDisabled, setIsBtnDisabled] = useState(true)
    const [isValid, setIsValid] = useState(false)

    useEffect(() => {
        setIsValid(
            email.inputValid &&
            name.inputValid &&
            surname.inputValid &&
            password.inputValid &&
            passwordConfirm.inputValid &&
            isCheckboxChecked
        )
    }, [
        email.inputValid, 
        name.inputValid, 
        surname.inputValid, 
        password.inputValid,
        passwordConfirm.inputValid,
        isCheckboxChecked,
    ])   

    useEffect(() => {
        setIsBtnDisabled(!isValid || status === 'loading')
    }, [isValid, status])

    const handleCheckbox = () => setIsCheckboxChecked(bool => !bool)

    const register = () => {
        dispatch(registration({
            email: email.value,
            password: password.value,
            name: name.value,
            surname: surname.value,
        }))
    }

    if(isAuth) return <Navigate to="/profile/my-data" />

    return (
        <div className='page'>
            <div className={`${s.auth} ${s.container}`}>
                <div className={s.head}>
                    <h2 className='title'>Регистрация</h2>
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
                        <div className={s.flex}>
                            <Input 
                                value={name.value}
                                inputS={s.form__input}
                                change={name.onChange}
                                blur={name.onBlur}
                                isError={name.errorMsg}
                            >Имя</Input>
                            <Input 
                                value={surname.value}
                                inputS={s.form__input}
                                change={surname.onChange}
                                blur={surname.onBlur}
                                isError={surname.errorMsg}
                            >Фамилия</Input>
                        </div>
                        <Input 
                            type="password"
                            value={password.value}
                            inputS={s.form__input}
                            change={password.onChange}
                            blur={password.onBlur}
                            isError={password.errorMsg}
                            isPassword
                        >Пароль</Input>
                        <Input 
                            type="password" 
                            value={passwordConfirm.value}
                            inputS={s.form__input}
                            change={passwordConfirm.onChange}
                            blur={passwordConfirm.onBlur}
                            isError={passwordConfirm.errorMsg}
                            isPassword
                        >Подтвердите пароль</Input>
                    </div>
                    <div className={s.check}>
                        <InputBox 
                            inputType='checkbox'
                            isChecked={isCheckboxChecked} 
                            change={handleCheckbox} 
                            id='treatment-person-data' 
                            type='checkbox'
                        />
                        <label className={s.small} htmlFor='treatment-person-data'>Я даю согласие на <a target='_blank' rel="noreferrer" href="https://ru.wikipedia.org/wiki/%D0%9E%D0%B1%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D0%BA%D0%B0_%D0%BF%D0%B5%D1%80%D1%81%D0%BE%D0%BD%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D1%85_%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85">обработку персональных данных</a></label>
                    </div>
                    <div className={s.button__box}>
                        <Button click={register} disabled={isBtnDisabled}>Зарегистрироваться</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegistrationPage