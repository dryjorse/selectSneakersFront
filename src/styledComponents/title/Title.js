import React from 'react'
import s from './title.module.css'

function Title({children, size}) {
    return (
        <div className={s.titleBox} style={{gap: size === 'big' ? '78px' : '29px'}}>
            <div className={`${s.titleLine} ${s.left}`}></div>
            <h2 className={s.title}>{children}</h2>
            <div className={`${s.titleLine} ${s.right}`}></div>
        </div>
    )
}

export default Title