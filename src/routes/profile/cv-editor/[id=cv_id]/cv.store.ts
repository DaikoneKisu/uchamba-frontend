import { writable } from 'svelte/store'

interface CVPayload {
  careerId: number
  careerName?: string
  cvId?: number
  name: string
  entries: {
    education: {
      featured: number[]
      personal: number[]
    }
    experiences: number[]
    languages: number[]
    skills: {
      soft: string[]
      hard: string[]
    }
  }
}

export const cv = writable<CVPayload>({
  careerId: 0,
  name: '',
  entries: {
    education: {
      featured: [],
      personal: []
    },
    experiences: [],
    languages: [],
    skills: {
      soft: [],
      hard: []
    }
  }
})
