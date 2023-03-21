import React from 'react'
import s from './tooltip.module.css'

function Tooltip({children, isActive}) {
    return (
        <div className={`${s.tooltip} ${isActive ? s.active : undefined}`}>
            <p>{children}</p>
        </div>
    )
}

export default Tooltip