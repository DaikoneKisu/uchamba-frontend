import { object, string, boolean } from 'yup'

const schema = object({
	organizationName: string().required('Campo requerido'),
	jobTitle: string().required('Campo requerido'),
	description: string().required('Campo requerido'),
	entryDate: string().required('Campo requerido'),
	departureDate: string().optional(),
	freelancer: boolean(),
	country: string().when('freelancer', {
		is: false,
		then: (s) => s.required('Campo requerido'),
		otherwise: (s) => s.notRequired()
	}),
	state: string().when('freelancer', {
		is: false,
		then: (s) => s.required('Campo requerido'),
		otherwise: (s) => s.notRequired()
	}),
	city: string().when('freelancer', {
		is: false,
		then: (s) => s.required('Campo requerido'),
		otherwise: (s) => s.notRequired()
	}),
	address: string().when('freelancer', {
		is: false,
		then: (s) => s.required('Campo requerido'),
		otherwise: (s) => s.notRequired()
	})
})

export const validateAcademicExperience = (obj: object) => {
	return schema.validateSync(obj, { abortEarly: false })
}
