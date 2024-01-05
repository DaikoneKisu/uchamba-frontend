import { object, string, array } from 'yup'
import { file } from '$lib/utils/yup-file'

const schema = object({
  projectId: string().required('Campo requerido'),
  name: string().required('Campo requerido'),
  description: string().max(596, 'Se superó el límite de caracteres').required('Campo requerido'),
  projectUrl: string(),
  coverImage: file().required('Campo requerido'),
  coverImageId: string().optional(),
  images: array().of(file()).required('Campo requerido'),
  deletedImages: array().of(string()).required('Campo requerido')
})

export function validateProjectEditionPayload(obj: object) {
  return schema.validateSync(obj)
}
