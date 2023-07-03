import * as yup from 'yup';

export const inventoryValidationSchema = yup.object().shape({
  tool_name: yup.string().required(),
  status: yup.string().required(),
  company_id: yup.string().nullable().required(),
});
