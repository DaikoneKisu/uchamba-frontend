export interface graduatedInfo {
    name: string
  address: {
    country: string
    state: string
    city: string
  }
  featuredEducations: 
    {
      name: string
    }[]
  languages: 
    {
      name: string
      proficientLevel: string
    }[]
  aboutMe: string
  skills: {
    softSkills: 
      {
        name: string
      }[]
    hardSkills:
      {
        name: string
      }[]
  }
}
