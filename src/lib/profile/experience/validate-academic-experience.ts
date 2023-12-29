import { object, string, boolean, date, ref } from 'yup'

const schema = object({
  organizationName: string().required('Campo requerido'),
  jobTitle: string().required('Campo requerido'),
  description: string().required('Campo requerido'),
  entryDate: date().required('Campo requerido'),
  departureDate: date()
    .nullable()
    .transform((curr: Date, orig) => (orig === '' ? null : curr))
    .when('entryDate', {
      is: (entryDate: Date) => Boolean(entryDate),
      then: (s) => s.min(ref('entryDate'), 'La fecha de salida debe ser posterior a la de entrada')
    }),

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
