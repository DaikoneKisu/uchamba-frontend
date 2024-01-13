import { object, string, mixed } from 'yup'

const schema = object({
  name: string().required('Campo requerido'),
  degree: mixed()
    .oneOf(['pregrado', 'postgrado', 'especializacion', 'maestria', 'doctorado'])
    .required('Campo requerido'),
  universityName: string().required('Campo requerido'),
  graduationYear: string()
    .required('Campo requerido')
    .test('is-a-valid-year', 'Debe ser un año válido', (value) => {
      const yearRegex = /^(19|20)\d{2}$/
      return yearRegex.test(value)
    })
    .test('is-not-a-future-year', 'No puede ser un año futuro', (value) => {
      const currentYear = new Date().getFullYear()
      return Number(value) <= currentYear
    })
})

export const validateAcademicTraining = (obj: object) => {
  return schema.validateSync(obj, { abortEarly: false })
}
