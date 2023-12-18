import { object, string, mixed } from 'yup'

const schema = object({
	name: string().required('Campo requerido'),
	description: string().required('Campo requerido'),
	projectUrl: string().required('Campo requerido').url('URL inválida'),
	coverImage: mixed().required('Campo requerido'),
	images: mixed().required('Campo requerido')
})

export const validateProject = (obj: object) => {
	return schema.validateSync(obj, { abortEarly: false })
}
