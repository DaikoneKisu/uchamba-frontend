import { object, string } from 'yup'

const schema = object({
  aboutMe: string().max(442, 'Se superó el límite de caracteres').required('Campo requerido'),
  email: string().required('Campo requerido').email('Email inválido'),
  country: string().required('Campo requerido'),
  state: string().required('Campo requerido'),
  city: string().required('Campo requerido'),
  residenceAddress: string().required('Campo requerido')
})

export const validatePersonalInformation = (obj: object) => {
  return schema.validateSync(obj, { abortEarly: false })
}
