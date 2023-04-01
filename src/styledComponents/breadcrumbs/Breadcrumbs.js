import React, { Fragment } from 'react'
import { useLocation } from 'react-router-dom'
import { profileRouter, routes } from '../../routes/routes';
import { ReactComponent as BreadArrow } from '../../assets/images/common/bread-arrow.svg';
import s from './breadcrumbs.module.css'

function Breadcrumbs() {
    const location = useLocation()
    
    const links = [
        ...routes,
        ...profileRouter,
    ]

    const activeLinks = location.pathname.split('/').map(active => {
        return active && links.find(link => clearPath(link.path) === active)
    }).filter(e => e)

    function clearPath (string) {
        let newString = ''
        for(let letter of string) {
            if(letter !== '/' && letter !== '*') newString += letter
        }
        return newString
    }

    return (
        <div className={s.main}>
            {activeLinks.map((link, id) =>
                <Fragment key={link.id}>
                    <span className={s.text}>{link.text}</span>
                    {id < activeLinks.length - 1 && <BreadArrow className={s.arrow}/>}
                </Fragment>    
            )}
        </div>
    )
}

export default Breadcrumbs