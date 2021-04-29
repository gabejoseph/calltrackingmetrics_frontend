import React from 'react'
import './Card.css'


function Card({ src, title, description, direction }) {
    return (
        <div className='card' >
            <img src={src} alt="" />
            <div className='card_info' >
                {direction === "outbound-api" ? 
                <h2>To: {title}</h2>
                :
                <h2>From: {title}</h2>
                }
                <h4>{description}</h4>
            </div>
        </div>
    )
}

export default Card
