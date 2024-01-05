import { object, string, boolean, date, ref } from 'yup'

const schema = object({
  organizationName: string().required('Campo requerido'),
  jobTitle: string().required('Campo requerido'),
  description: string().max(596, 'Se superó el límite de caracteres').required('Campo requerido'),
  entryDate: date()
    .transform((curr: Date, orig) => (orig === '' ? null : curr))
    .required('Campo requerido'),
  departureDate: date()
    .nullable()
    .transform((curr: Date, orig) => (orig === '' ? null : curr))
    .when('entryDate', {
      is: (entryDate: Date) => Boolean(entryDate),
      then: (s) => s.min(ref('entryDate'), 'La fecha de salida debe ser posterior a la de entrada')
    }),
  freelancer: boolean().required('Campo requerido'),
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
