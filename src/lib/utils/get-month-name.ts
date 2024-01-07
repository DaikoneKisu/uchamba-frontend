export function getMonthName(date: Date) {
  return date.toLocaleString('es-ES', { month: 'long' })
}
