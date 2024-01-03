import { object, string, array } from 'yup'
import { file } from '$lib/utils/yup-file'

const schema = object({
  projectId: string().required(),
  name: string().required(),
  description: string().required(),
  projectUrl: string(),
  coverImage: file().required(),
  coverImageId: string().optional(),
  images: array().of(file()).required(),
  deletedImages: array().of(string()).required()
})

export function validateProjectEditionPayload(obj: object) {
  return schema.validateSync(obj)
}
