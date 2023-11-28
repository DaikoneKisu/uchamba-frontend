export interface ProfileData {
	userId: number
	name: string
	email: string
	aboutMe: string
	phoneNumber: string
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
	featured: Featured[]
	personal: Personal[]
}

export interface Featured {
	skillId: number
	name: string
	createdAt: string
}

export interface Personal {
	skillId: number
	name: string
	createdAt: string
}

export interface SoftSkills {
	featured: Featured2[]
	personal: Personal2[]
}

export interface Featured2 {
	skillId: number
	name: string
	createdAt: string
}

export interface Personal2 {
	skillId: number
	name: string
	createdAt: string
}

export interface Education {
	featured: Featured3[]
	personal: Personal3[]
}

export interface Featured3 {
	ucareerId: number
	name: string
	degree: string
	graduationDate: string
	createdAt: string
}

export interface Personal3 {
	studyId: number
	name: string
	universityName: string
	degree: string
	graduationDate: string
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
	createdAt: string
}

export interface Project {
	projectId: number
	name: string
	description: string
	projectUrl: string
	createdAt: string
	updatedAt: string
}
