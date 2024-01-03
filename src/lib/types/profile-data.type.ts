export interface ProfileData {
  userId: number
  name: string
  email: string
  aboutMe: string
  country: string
  state: string
  city: string
  residenceAddress: string
  role: string
  isVerified: boolean
  createdAt: string
  updatedAt: string
  languages: Language[]
  personalLinks: PersonalLink[]
  skills: {
    hard: string[]
    soft: string[]
  }
  education: Study[]
  workExperiences: WorkExperience[]
  projects: Project[]
  cvs: CV[]
}

export interface Language {
  languageId: number
  name: string
  proficientLevel: string
  createdAt: string
  updatedAt: string
}

export interface PersonalLink {
  linkId: number
  name: string
  url: string
  createdAt: string
  updatedAt: string
}

export interface Study {
  id: number
  name: string
  degree: string
  universityName?: string
  graduationYear: string
  createdAt: string
}

export interface PersonalStudy {
  id: number
  name: string
  universityName: string
  degree: string
  graduationYear: string
  createdAt: string
}

export interface WorkExperience {
  workExpId: number
  organizationName: string
  jobTitle: string
  address: string
  description: string
  entryDate: string
  departureDate: string
  city: string
  state: string
  country: string
  freelancer: boolean
  createdAt?: string
}

export interface Project {
  projectId: number
  name: string
  description: string
  projectUrl?: string
  coverImageId: string
  coverImageUrl: string
  images: {
    imageCloudId: string
    imageUrl: string
  }[]
}

export interface CV {
  cvId: number
  careerId: number
  careerName: string
  name: string
}
