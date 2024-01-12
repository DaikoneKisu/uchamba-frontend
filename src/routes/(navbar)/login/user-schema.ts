import { string, object } from 'yup'

export const userSchema = object({
  email: string()
    .required('El email no puede estar vacío')
    .test(
      'is-est-ucab-email',
      'El correo debe ser un correo UCAB válido',
      (value) => value !== undefined && /^.+@est.ucab.edu.ve$/.test(value)
    ),
  password: string().required('La contraseña no puede estar vacía')
})
