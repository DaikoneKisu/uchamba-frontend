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
  hardSkills: HardSkills
  softSkills: SoftSkills
  education: Education
  workExperiences: WorkExperience[]
  projects: Project[]
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

export interface HardSkills {
  featured: Skill[]
  personal: Skill[]
}

export interface SoftSkills {
  featured: Skill[]
  personal: Skill[]
}

export interface Skill {
  skillId: number
  name: string
  createdAt: string
}

export interface Education {
  featured: FeaturedStudy[]
  personal: PersonalStudy[]
}

export interface FeaturedStudy {
  ucareerId: number
  name: string
  degree: string
  graduationYear: string
  createdAt: string
}

export interface PersonalStudy {
  studyId: number
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
