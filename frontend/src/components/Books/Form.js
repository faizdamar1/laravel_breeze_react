import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@/components/Froms/formControl'
import Input from '@/components/Froms/input'
import Button from '@/components/Froms/button'
import axios from '@/lib/axios'

const Form = ({ fetchBook, handleAddBook }) => {
    const initialValue = {
        name: '',
        description: '',
        price: 0,
    }

    const [form, setForm] = useState(initialValue)

    const { name, description, price } = form

    const handleChangeInput = e => {
        setForm(before => ({
            ...before,
            [e.target.name]: e.target.value,
        }))
    }

    const resetForm = () => {
        setForm(initialValue)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            // setLoading(true)
            const { data } = await axios.post(
                'http://localhost:8000/api/books',
                form,
            )

            handleAddBook({ book: data.data })
            resetForm()

            // fetchBook()
        } catch (error) {
            // setError(error.message)
            console.log(error)
        } finally {
            // setLoading(false)
        }
    }

    return (
        <div className="w-full">
            <form onSubmit={handleSubmit}>
                <FormControl label="Name" id="name">
                    <Input
                        placeholder="name"
                        id="name"
                        name="name"
                        onChange={handleChangeInput}
                        value={name}
                    />
                </FormControl>
                <FormControl label="Description" id="description">
                    <Input
                        placeholder="description"
                        id="description"
                        name="description"
                        onChange={handleChangeInput}
                        value={description}
                    />
                </FormControl>
                <FormControl label="Price" id="price">
                    <Input
                        placeholder="price"
                        id="price"
                        name="price"
                        type="number"
                        onChange={handleChangeInput}
                        value={price}
                    />
                </FormControl>
                <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}

Form.propTypes = {}

export default Form
