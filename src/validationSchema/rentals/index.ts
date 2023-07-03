import * as yup from 'yup';

export const rentalValidationSchema = yup.object().shape({
  rental_date: yup.date().required(),
  return_date: yup.date(),
  customer_id: yup.string().nullable().required(),
  inventory_id: yup.string().nullable().required(),
});
