import React, { useState } from 'react'
import s from './input.module.css'
import { ReactComponent as BlockIcon } from '../../assets/images/common/block.svg'
import { ReactComponent as BlockedIcon } from '../../assets/images/common/blocked.svg'

function Input({
    children, leftIcon, rightElem, type, tooltip, 
    change, focus, blur, inputS, value, isError, isPassword
}) {
    const [isBlocked, setIsBlocked] = useState(isPassword)

    return (
        <div className={`${s.box} ${isError ? s.error : ''}`}>
            <div className={s.inputBox}>
                {leftIcon}
                <input 
                    value={value}
                    style={{
                        marginLeft: leftIcon ? '15px' : '10px'
                    }}
                    type={isPassword ? isBlocked ? 'password' : 'text' : type || 'text'} 
                    className={`${s.input} ${inputS}`}
                    placeholder={children}
                    onChange={change}
                    onFocus={focus}
                    onBlur={blur}
                />
                {
                isPassword && 
                    <button className={s.block__btn} onClick={() => setIsBlocked(bool => !bool)}>
                        {isBlocked ? <BlockedIcon /> : <BlockIcon />}
                    </button>
                }
                {rightElem}
            </div>
            {tooltip}
        </div>
    )
}

export default Input