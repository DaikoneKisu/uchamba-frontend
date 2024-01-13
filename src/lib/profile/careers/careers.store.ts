import { readable } from 'svelte/store'

export const careers = readable<Record<number, string>>({
  1: 'Administración de Empresas',
  2: 'Comunicación Social',
  3: 'Contaduría Pública',
  4: 'Derecho',
  5: 'Educación',
  6: 'Ingeniería Civil',
  7: 'Ingeniería Industrial',
  8: 'Ingeniería Informática',
  9: 'Relaciones Industriales'
})
