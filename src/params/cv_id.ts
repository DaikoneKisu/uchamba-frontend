export function match(param: string) {
  return /^\d+$/.test(param) || param === 'new'
}
