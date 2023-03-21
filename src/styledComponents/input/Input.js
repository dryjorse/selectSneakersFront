import React, { useState } from 'react'
import s from './input.module.css'

function Input({children, leftIcon, rightElem, type, tooltip, change, focus, blur}) {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
        change?.(e)
    }

    return (
        <div className={s.box}>
            <div className={s.inputBox}>
                {leftIcon}
                <input 
                    value={value}
                    style={{
                        marginLeft: leftIcon ? '15px' : '10px'
                    }}
                    type={type || 'text'} 
                    className={s.input}
                    placeholder={children}
                    onChange={onChange}
                    onFocus={focus}
                    onBlur={blur}
                />
                {rightElem}
            </div>
            {tooltip}
        </div>
    )
}

export default Input