import { object, string, mixed, array } from 'yup'

const schema = object({
  name: string().required('Campo requerido'),
  description: string().required('Campo requerido'),
  projectUrl: string().url('URL inválida').optional(),
  coverImage: file().required('Campo requerido'),
  images: array().of(file()).min(1).required('Campo requerido')
})

function file() {
  return mixed((input: unknown): input is File => input instanceof File)
}

export const validateProject = (obj: object) => {
  return schema.validateSync(obj, { abortEarly: false })
}
