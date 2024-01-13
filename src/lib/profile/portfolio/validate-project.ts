import { object, string, array } from 'yup'
import { file } from '$lib/utils/yup-file'

const schema = object({
  name: string().required('Campo requerido'),
  description: string().max(596, 'Se superó el límite de caracteres').required('Campo requerido'),
  projectUrl: string().url('URL inválida').optional(),
  coverImage: file().required('Campo requerido'),
  images: array().of(file()).min(1).required('Campo requerido')
})

export const validateProject = (obj: object) => {
  return schema.validateSync(obj, { abortEarly: false })
}
