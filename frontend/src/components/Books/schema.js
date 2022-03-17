import * as Yup from 'yup'

export const bookSchema = Yup.object().shape({
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
