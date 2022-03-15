import { useEffect, useState } from 'react'

import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import BookForm from '@/components/Books/Form'
import BookList from '@/components/Books/List'

const BookPage = () => {
    const [books, setBooks] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [isError, setError] = useState(null)

    useEffect(() => {
        fetchBook()
    }, [])

    const bookSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Name to short')
            .max(254, 'Name to long')
            .required('Name is Required'),
        description: Yup.string()
            .min(10, 'Description to short')
            .max(300, 'Description to long')
            .required('Description Required'),
        price: Yup.number().required('Price is Required'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: 0,
        },
        validationSchema: bookSchema,
        onSubmit: async (values, { resetForm }) => {
            if (values.id) {
                updateBook(values, resetForm)
            } else {
                addBook(values, resetForm)
            }
        },
    })

    const handleAddBook = ({ book }) => {
        setBooks(dataBefore => [...dataBefore, book])
    }

    const handleUpdateBook = ({ book }) => {
        const updateBooks = books.map(item =>
            item.id === book.id ? book : item,
        )

        setBooks(updateBooks)
    }

    const handleDeleteBook = (id) => {

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

    const deleteBook = async (id) => {
        try {
            await axios.delete(
                `http://localhost:8000/api/books/${id}`
            )

            handleDeleteBook(id)

        } catch (error) {
            console.log(error)
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


    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Boooks
                </h2>
            }>
            <Head>
                <title>Laravel - Boooks</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <BookForm
                                fetchBook={fetchBook}
                                handleAddBook={handleAddBook}
                                formik={formik}
                            />
                            <BookList books={books} getBook={getBook} deleteBook={deleteBook} />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default BookPage
