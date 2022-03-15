import React from 'react'
import PropTypes from 'prop-types'

const Button = ({
    children,
    type = 'submit',
    className,
    variant,
    ...props
}) => {
    const bgVariant = {
        danger: 'bg-red-600',
        primary: 'bg-indigo-600',
        warning: 'bg-yellow-400',
        success: 'bg-green-500',
    }

    const hoverVarian = {
        danger: 'hover:bg-red-700',
        primary: 'hover:bg-indigo-700',
        warning: 'hover:bg-yellow-500',
        success: 'hover:bg-green-600',
    }
    return (
        <button
            className={`${
                props.disabled
                    ? 'bg-gray-600 hover:bg-gray-600'
                    : `${bgVariant[variant] ?? 'bg-blue-500'} ${hoverVarian[variant] ?? 'hover:bg-blue-700'}`
            } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${className || ''} `}
            type={type}
            {...props}>
            {children}
        </button>
    )
}

Button.propTypes = {}

export default Button
