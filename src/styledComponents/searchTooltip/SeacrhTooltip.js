import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material';
import { selectedSearched } from '../../store/slices/searchSlice'
import s from './searchTooltip.module.css'


function SeacrhTooltip({isActive}) {
    const navigate = useNavigate()
    const {products, status} = useSelector(selectedSearched)
    
    return (
        <div className={`${s.tooltip} ${isActive ? s.active : undefined}`}>
            {status === 'finish' 
                ? 
                    products.map(product => 
                        <div key={product.id} className={s.item}>
                            <Link 
                                onMouseDown={() => navigate(`/catalog/${product.id}`)} 
                                to={`/catalog/${product.id}`} 
                            >{product.name}</Link>
                        </div>
                    ) 
                :
                    <div className={s.loading}>
                        <CircularProgress />
                    </div>
            }
        </div>
    )
}

export default SeacrhTooltip