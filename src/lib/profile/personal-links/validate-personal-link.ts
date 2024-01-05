import { object, string } from 'yup'

const schema = object({
  url: string().required('Campo requerido').url('URL inválida')
})

export const validatePersonalLink = (obj: object) => {
  return schema.validateSync(obj, { abortEarly: false })
}
