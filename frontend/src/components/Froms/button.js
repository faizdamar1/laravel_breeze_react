import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, type = "submit" }) => {
    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type={type}>
            {children}
        </button>
    )
}

Button.propTypes = {}

export default Button