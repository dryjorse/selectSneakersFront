import React from 'react'
import { CircularProgress } from '@mui/material';

function LoadinPage({option = 1}) {

    if(option === 2) return (
        <div className='loading'>
            <CircularProgress style={{
                width: '50px',
                height: '50px'
            }}/>
        </div>
    )

    return (
        <div className='page center'>
            <CircularProgress style={{
                width: '50px',
                height: '50px'
            }}/>
        </div>
    )
}

export default LoadinPage