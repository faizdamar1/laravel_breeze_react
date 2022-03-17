import { useEffect, useState } from 'react'
import axios from '@/lib/axios'


const useBook = (formik) => {
    const [books, setBooks] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(null)

    useEffect(() => {
        fetchBook()
    }, [])



    const handleAddBook = ({ book }) => {
        setBooks(dataBefore => [...dataBefore, book])
    }

    const handleUpdateBook = ({ book }) => {
        const updateBooks = books.map(item =>
            item.id === book.id ? book : item,
        )

        setBooks(updateBooks)
    }

    const handleDeleteBook = id => {
        const filteredBooks = books.filter(item => item.id !== id)
        setBooks(filteredBooks)
    }

    const fetchBook = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost:8000/api/books')
            setBooks(data.data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    const getBook = async id => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/books/${id}`,
            )

            const book = data.data

            formik.setFieldValue('name', book.name)
            formik.setFieldValue('description', book.description)
            formik.setFieldValue('price', book.price)
            formik.setFieldValue('id', book.id)
        } catch (error) {
            console.log(error)
        }
    }

    const addBook = async (values, resetForm) => {
        try {
            const { data } = await axios.post(
                'http://localhost:8000/api/books',
                values,
            )

            handleAddBook({ book: data.data })
            resetForm()
        } catch (error) {
            console.log(error)
        }
    }

    const updateBook = async (values, resetForm) => {
        try {
            const { data } = await axios.put(
                `http://localhost:8000/api/books/${values.id}`,
                values,
            )

            handleUpdateBook({ book: data.data })
            resetForm()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteBook = async id => {
        const isOke = confirm('Are you sure want to delete data?')

        if (isOke) {
            try {
                await axios.delete(`http://localhost:8000/api/books/${id}`)

                handleDeleteBook(id)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {
        books,
        isLoading,
        isError,
        fetchBook,
        getBook,
        addBook,
        updateBook,
        deleteBook,
        handleAddBook,
        handleUpdateBook,
        handleDeleteBook,
    }
}

export default useBook
