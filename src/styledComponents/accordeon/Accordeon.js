import React, { useState } from 'react'
import s from './accordeon.module.css'
import { ReactComponent as Arrow } from '../../assets/images/common/arrow.svg';

function Accordeon({children, head, height}) {  
    const [isOpened, setIsOpened] = useState(false)

    const handleIsOpened = () => {
        setIsOpened(bool => !bool)
    }

    return (
        <div className={`${s.accordeon} ${isOpened ? s.active : undefined}`}>
            <div onClick={handleIsOpened} className={s.head}>
                {head}
                <Arrow className={s.arrow}/>
            </div>
            <div 
                className={`${s.body} `}
                style={{maxHeight: isOpened ? height : 0}}
            >
                {children}
            </div>
        </div>
    )
}

export default Accordeon