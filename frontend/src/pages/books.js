import { useEffect, useState } from 'react'
import AppLayout from '@/components/Layouts/AppLayout'
import Head from 'next/head'
import axios from '@/lib/axios'

const BookPage = () => {

    const [books, setBooks] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(null);

    const fetchBook = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get("http://127.0.0.1:8000/api/books");
            setBooks(data.data);
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBook()
    }, []);

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
                            {
                                isError ? isError : isLoading ? "loading" :
                                    books.map(book => (
                                        <p key={book.id}>
                                            {book.id} | {book.name}
                                        </p>
                                    ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default BookPage