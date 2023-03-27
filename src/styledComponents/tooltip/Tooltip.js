import React from 'react'
import s from './tooltip.module.css'

function Tooltip({children, isActive, filterList, type}) {
    if(filterList) return (
        <div 
            onMouseDown={e => isActive === type && e.preventDefault()}
            className={`${s.filter__box}  ${isActive === type ? s.active : null}`}
        >
            {children}
        </div>    
    )

    return (
        <div className={`${s.tooltip} ${isActive ? s.active : null}`}>
            <p>{children}</p>
        </div>
    )
}

export default Tooltip