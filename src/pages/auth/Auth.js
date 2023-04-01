import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotFoundPage from '../notFoundPage/NotFoundPage'
import ChangePasswordPage from './changePasswordPage/ChangePasswordPage'
import ForgorPasswordPage from './forgotPaswordPage/ForgorPasswordPage'
import LoginPage from './loginPage/LoginPage'
import RegistrationPage from './registrationPage/RegistrationPage'

const authRouter = [
    {path: '*', elem: <NotFoundPage />, id: 1,},
    {path: '/', elem: <Navigate to='/auth/registration' />, id: 2,},
    {path: '/registration', elem: <RegistrationPage />, id: 3,},
    {path: '/login', elem: <LoginPage />, id: 4,},
    {path: '/change-password', elem: <ChangePasswordPage />, id: 5,},
    {path: '/forgot-password', elem: <ForgorPasswordPage />, id: 6,}
]

function Auth() {
    return (
        <Routes >
            {authRouter.map(route => 
                <Route 
                    key={route.id}
                    path={route.path} 
                    element={route.elem}
                />
            )}
        </Routes>
    )
}

export default Auth