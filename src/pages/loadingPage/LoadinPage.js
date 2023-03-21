import React from 'react'
import { CircularProgress } from '@mui/material';

function LoadinPage() {
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