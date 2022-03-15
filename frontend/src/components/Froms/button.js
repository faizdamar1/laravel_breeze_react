import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, type = 'submit', ...props }) => {
    return (
        <button
            className={`${
                props.disabled
                    ? 'bg-gray-600 hover:bg-gray-600'
                    : 'bg-blue-500 hover:bg-blue-700'
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
            type={type}
            {...props}>
            {children}
        </button>
    )
}

Button.propTypes = {}

export default Button
