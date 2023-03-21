import React, { Fragment } from 'react'

function Text({children, color}) {
    return (
        <p style={{color: color || 'black'}}>{
            children?.split('\n').map((string, key) => (
                <Fragment key={key}>
                    {string} 
                    <br />
                </Fragment>
            ))
        }</p>
    )
}

export default Text