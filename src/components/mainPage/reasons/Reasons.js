import React, { useState } from 'react'
import s from './reasons.module.css'
import Title from '../../../styledComponents/title/Title'
import { ReactComponent as Cup } from '../../../assets/images/main-page/cup.svg'
import { ReactComponent as Guarantee } from '../../../assets/images/main-page/guarantee.svg'
import { ReactComponent as Purchaces } from '../../../assets/images/main-page/purchaces.svg'
import { ReactComponent as Support } from '../../../assets/images/main-page/support.svg'
import Tooltip from '../../../styledComponents/tooltip/Tooltip'

function Reasons() {
    const [tooltip, setTooltip] = useState('')
    const reasons = [
        {
            name: 'guality',
            title: 'Высокое качество',
            description: 'Изготовлено по лучшим технологиям',
            icon: <Cup />,
            tooltipText: 'Качество Товара превыше всего. Каждый Товар проходит строгую проверку перед публикацией на сайте.',
        },
        {
            name: 'term',
            title: 'Гарантийный срок',
            description: 'В течение двух месяцев',
            icon: <Guarantee />,
            tooltipText: 'Если Товар не был доставлен в течение двух месяцев - Select Sneakers вернет всю стоимость Вашего заказа.',
        }, 
        {
            name: 'purchaces',
            title: 'Покупки без риска',
            description: 'Лучшие условия по возврату и обмену',
            icon: <Purchaces />,
            tooltipText: 'В случае выбора не того размера, цвета или случайного заказа - вы можете заполнить бланк возврата Товара и денег.',
        },
        {
            name: 'support',
            title: 'Поддержка 24 / 7',
            description: 'Служба поддержки',
            icon: <Support />,
            tooltipText: 'Служба поддержки примет Ваш вызов в любое время суток!',
        },
    ]

    const handleTooltip = (e, newTooltip = '') => {
        setTooltip(newTooltip)
    }

    return (
        <div className={s.reasons}>
            <Title size='big'>Почему именно мы?</Title>
            <div className='container'>
                <ul className={s.list}>
                    {reasons.map((reason, key) => 
                        <li 
                            key={key}
                            onMouseOver={(e) => handleTooltip(e, reason.name)}
                            onMouseOut={handleTooltip}
                        >
                            {reason.icon}
                            <div className={s.item__descr}>
                                <h3>{reason.title}</h3>
                                <span>{reason.description}</span>
                            </div>
                            <Tooltip isActive={tooltip === reason.name}>{reason.tooltipText}</Tooltip>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}

export default Reasons