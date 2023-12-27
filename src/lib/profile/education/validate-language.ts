import { object, string, mixed } from 'yup'

const schema = object({
  langId: string().required('Campo requerido'),
  proficientLevel: mixed()
    .oneOf(['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'Native'])
    .required('Campo requerido')
})

export const validateLanguage = (obj: object) => {
  return schema.validateSync(obj, { abortEarly: false })
}
