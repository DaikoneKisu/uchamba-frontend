import { readable } from 'svelte/store'

export const careers = readable<Record<number, string>>({
  1: 'Ingenieria Informatica',
  2: 'Ingenieria Civil',
  3: 'Ingenieria Industrial',
  4: 'Relaciones Industriales',
  5: 'Educacion',
  6: 'Comunicacion Social',
  7: 'Derecho',
  8: 'Administracion de Empresas',
  9: 'Contaduria Publica'
})
