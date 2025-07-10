import * as Yup from 'yup';

export const urlValidationSchema = Yup.object({
  url: Yup.string()
    .required('URL is required')
    .url('Please enter a valid URL')
  
});