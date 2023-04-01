import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { profileRouter } from '../../routes/routes'

function Profile() {
    

    return (
        <Routes >
            {profileRouter.map(route =>
                <Route 
                    key={route.id}
                    path={route.path}
                    element={route.elem}
                />    
            )}
        </Routes>
    )
}

export default Profile