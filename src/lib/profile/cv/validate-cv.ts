import { object, string, array, number } from 'yup'

const schema = object({
  careerId: string().required('Campo requerido'),
  name: string().required('Campo requerido'),
  entries: object({
    education: object({
      featured: array().of(number()),
      personal: array().of(number())
    })
      .test('at-least-one', 'Debe tener al menos una entrada', (entries) => {
        return Boolean(entries?.featured?.length || entries?.personal?.length)
      })
      .required('Campo requerido'),
    experiences: array().of(number()).min(1).required('Campo requerido'),
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
