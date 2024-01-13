import { writable } from 'svelte/store'

interface Location {
  country: string
  state: string
  city: string
}

function createLocation() {
  const { subscribe, set, update } = writable<Location>()

  const cleanLocation = {
    country: '',
    state: '',
    city: ''
  }

  return {
    subscribe,
    set: (location: Location) => set(location),
    add: (location: Location) =>
      update((prevLocation) => {
        prevLocation.country += ` ${location.country}`
        prevLocation.state += ` ${location.state}`
        prevLocation.city += ` ${location.city}`
        return prevLocation
      }),
    clear: () => set(cleanLocation)
  }
}

export const locationFilter = createLocation()
