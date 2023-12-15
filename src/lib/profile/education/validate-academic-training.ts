import { object, string, mixed } from 'yup'

const schema = object({
	name: string().required('Campo requerido'),
	degree: mixed()
		.oneOf(['pregrado', 'postgrado', 'especializacion', 'maestria', 'doctorado'])
		.required('Campo requerido'),
	universityName: string().required('Campo requerido'),
	//TODO: change this format to only year
	graduationYear: string().required('Campo requerido')
})

export const validateAcademicTraining = (obj: object) => {
	return schema.validateSync(obj, { abortEarly: false })
}
