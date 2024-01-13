import { toast as toast_, type ToastOptions, type Renderable } from 'svelte-french-toast'

/* 
  This is a workaround to have type safety with the toast function and also be able to pass props in opts, 
  this should be changed once svelte-french-toast releases its new version supporting props to be passed 
*/

export const toast = <T extends ToastOptions>(message: Renderable, opts: T) => toast_(message, opts)
