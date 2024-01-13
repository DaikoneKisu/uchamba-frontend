type Education = string

type SoftSkill = string

type HardSkill = string

export interface Curriculum {
  cvId: number
  careerName: string
  name: string
  updatedAt: string
}
export interface Language {
  name: string
  proficientLevel: string
}

export interface CatalogueInfo {
  userId: number
  name: string
  aboutMe: string
  country: string
  state: string
  city: string
  languages: Language[]
  skills: {
    hard: HardSkill[]
    soft: SoftSkill[]
  }
  education: Education[]
  cvs: Curriculum[]
}
