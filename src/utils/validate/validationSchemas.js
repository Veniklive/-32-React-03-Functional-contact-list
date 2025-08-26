import * as Yup from 'yup';

export const CONTACT_SCHEMA = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too short')
    .max(64, 'Too long')
    .required('First name is required field'),
  lastName: Yup.string()
    .min(2, 'Too short')
    .max(64, 'Too long')
    .required('Last name is required field'),
  email: Yup.string()
    .email('Email must be like "test@test.com"')
    .required('Email is required field'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Number must be like "0987654321"')
    .min(10, 'Too short')
    .max(15, 'Too long')
    .required('Phone number is required field'),
});
