import React from 'react'
import s from './inputBox.module.css'
import { ReactComponent as Check } from '../../assets/images/common/check.svg';

function InputBox({children, type, change, id, name, isChecked, cg, inputType, infoTwo, infoThree}) {
    return (
        <div className={`${s.checkbox__box} ${s[type]} ${isChecked ? s.active : null}`}>
            {type === 'checkbox' && <label htmlFor={id} className={s.check}>
                <Check
                    style={{opacity: isChecked ? 1 : 0}}
                    className={s.mark} 
                />
            </label>}
            <input 
                id={id}
                name={name}
                type={inputType}
                onChange={change}
                checked={isChecked}
                data-cg={cg}
                data-infotwo={infoTwo}
                data-infothree={infoThree}
                className={s.input}
            />
            <label className={s.label} htmlFor={id}>
                {
                    type === 'colors' ? 
                        <label 
                            style={{
                                background: name,
                                border: name === '#FFFFFF' ? '1px solid #908E8E' : ''
                            }}
                            htmlFor={id}
                        ></label>
                    : children
                }
            </label>
        </div>
    )
}

export default InputBox;