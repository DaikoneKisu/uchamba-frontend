import { readable } from 'svelte/store'

export const careers = readable<Record<number, string>>({
  1: 'Ingeniería Informatica',
  2: 'Ingeniería Civil',
  3: 'Ingeniería Industrial',
  4: 'Relaciones Industriales',
  5: 'Educación',
  6: 'Comunicación Social',
  7: 'Derecho',
  8: 'Administración de Empresas',
  9: 'Contaduría Pública'
})
