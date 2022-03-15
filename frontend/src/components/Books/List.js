import React from 'react'
import PropTypes from 'prop-types'
import Button from '../Froms/button'

const List = ({ books = [], getBook }) => {
    const Item = ({ children }) => {
        return (
            <div className="w-full border-gray-200 border-2 rounded-xl px-3 py-3 my-3">
                {children}
            </div>
        )
    }

    return (
        <div>
            {books.map((book, index) => (
                <Item key={book.id}>
                    <div className="flex justify-between items-center">
                        <div className="flex">
                            <p className="mr-1">{index + 1}</p>
                            <p>{book.name}</p>
                        </div>
                        <div>
                            <Button className="mr-2" onClick={()=>getBook(book.id)}>Edit</Button>
                            <Button variant="danger">Delete</Button>
                        </div>
                    </div>
                </Item>
            ))}
        </div>
    )
}

List.propTypes = {
    books: PropTypes.array.isRequired,
}

export default List
