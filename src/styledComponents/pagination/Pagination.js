import React, { useEffect, useState } from 'react'
import s from './pagination.module.css'

function Pagination({page, limit, change}) {
    const symbol = '...'
    const [pages, setPages] = useState([])

    useEffect(() => {
        let currPages = []

        if(limit < 8) {
            for(let i = 1; i <= limit; i++) {
                currPages.push(i)
            }
        } else {
            currPages = [1, 2, 3, 4, symbol, limit]
        }

        setPages(currPages)
    }, [limit])

    const handlePage = (newPage) => {
        newPage = +newPage || newPage

        if(newPage === symbol) return

        setPages(pages => {
            let currPages = []

            if(limit < 8) {
                for(let i = 1; i <= limit; i++) {
                    currPages.push(i)
                }
                return currPages
            }

            if(newPage >= 4 && newPage <= 15) {
                return [1, symbol, newPage - 1, newPage, newPage + 1, symbol, limit]
            }

            if(newPage < 4) {
                return [1, 2, 3, 4, symbol, limit]
            }

            if(newPage > limit - 3) {
                return [1, symbol, limit - 3, limit - 2, limit - 1, limit]
            }

            return pages
        })

        change?.(newPage)
    }   

    return (
        <ul className={s.pagination}>
            {pages.map((item, key) => 
                <li key={key}>
                    <button
                        name={item}
                        onClick={e => handlePage(e.target.name)}
                        className={`${s.item} ${item === page ? s.active : null}`}
                    >{item}</button>
                </li>
            )}
        </ul>
    )
}

export default Pagination