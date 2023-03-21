import React from 'react'
import { Link } from 'react-router-dom'
import s from './button.module.css'

function Button({children, pg, link}) {

    

    if(link) return (
        <Link to={link} style={{padding: pg || '14px 28px'}} className={s.btn}>
            {children}
        </Link>
    )

    return (
        <button style={{padding: pg || '14px 28px'}} className={s.btn}>
            {children}
        </button>
    )
}

export default Button