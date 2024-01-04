import { object, string, array, number } from 'yup'

const schema = object({
  careerId: string().required('Campo requerido'),
  name: string().required('Campo requerido'),
  entries: object({
    education: object({
      featured: array().of(number()).min(1).required('Campo requerido'),
      personal: array().of(number()).min(1).required('Campo requerido')
    }).required('Campo requerido'),
    experiences: array().of(number()).required('Campo requerido'),
    languages: array().of(number()).min(1).required('Campo requerido'),
    skills: object({
      soft: array().of(string()).min(1).required('Campo requerido'),
      hard: array().of(string()).min(1).required('Campo requerido')
    }).required('Campo requerido')
  }).required('Campo requerido')
})

export const validateCV = (obj: object) => {
  return schema.validateSync(obj, { abortEarly: false })
}
