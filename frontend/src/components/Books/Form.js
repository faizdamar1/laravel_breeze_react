import React, { useState } from 'react'
import PropTypes from 'prop-types'
import FormControl from '@/components/Froms/formControl'
import Input from '@/components/Froms/input'
import Button from '@/components/Froms/button'

const Form = ({ formik }) => {
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
                <Button
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}>
                    {formik.values.id ? "Update" : "Submit"}
                </Button>
            </form>
        </div>
    )
}

Form.propTypes = {}

export default Form
