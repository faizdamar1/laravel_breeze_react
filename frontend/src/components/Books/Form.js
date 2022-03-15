import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@/components/Froms/formControl'
import Input from '@/components/Froms/input'
import Button from '@/components/Froms/button'
import axios from '@/lib/axios'
import { useFormik } from 'formik'
import * as Yup from 'yup'

const Form = ({ fetchBook, handleAddBook }) => {
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
        onSubmit: (values, {resetForm}) => {
            handleSubmit(values, resetForm)
        },
    })

    const handleSubmit = async (values, resetForm) => {
        console.log(!(formik.isValid && formik.dirty))
        try {
            const { data } = await axios.post(
                'http://localhost:8000/api/books',
                values,
            )

            handleAddBook({ book: data.data })
            resetForm()
            // fetchBook()
        } catch (error) {
            console.log(error)
        } finally {
        }
    }

    return (
        <div className="w-full">
            <form onSubmit={formik.handleSubmit}>
                <FormControl label="Name" id="name">
                    <Input
                        placeholder="name"
                        id="name"
                        name="name"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['name']}
                        </label>
                    )}
                </FormControl>
                <FormControl label="Description" id="description">
                    <Input
                        placeholder="description"
                        id="description"
                        name="description"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['description']}
                        </label>
                    )}
                </FormControl>
                <FormControl label="Price" id="price">
                    <Input
                        placeholder="price"
                        id="price"
                        name="price"
                        type="number"
                        onChange={formik.handleChange}
                        value={formik.values.price}
                    />
                    {formik.errors && (
                        <label className="text-red-600">
                            {formik.errors['price']}
                        </label>
                    )}
                </FormControl>
                <Button type="submit" disabled={!(formik.isValid && formik.dirty)}>Submit</Button>
            </form>
        </div>
    )
}

Form.propTypes = {}

export default Form
