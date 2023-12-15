import { object, string } from 'yup'

const schema = object({
	organizationName: string().required('Campo requerido'),
	jobTitle: string().required('Campo requerido'),
	description: string().required('Campo requerido'),
	address: string().required('Campo requerido'),
    entryDate:string().required('Campo requerido'),
    departureDate:string().required('Campo requerido'),
})

export const validateAcademicExperience = (obj: object) => {
	return schema.validateSync(obj, { abortEarly: false })
}
