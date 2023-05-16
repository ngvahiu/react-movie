import React from 'react'
import './ButtonMovie.scss'

function ButtonMovie({ px, py, type, rounded, children, handleClick }) {
    return (
        <button type={type} className={`button-movie text-white text-lg transition-all duration-500 mr-3 rounded-${rounded}`} style={{
            paddingLeft: `${px / 8}rem`,
            paddingRight: `${px / 8}rem`,
            paddingTop: `${py / 8}rem`,
            paddingBottom: `${py / 8}rem`,
        }} onClick={handleClick ? () => handleClick() : null}>
            {children}
        </button>
    )
}

export default ButtonMovie