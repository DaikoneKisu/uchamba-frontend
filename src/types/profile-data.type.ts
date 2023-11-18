export interface ProfileData {
	personalInformation: {
		name: string
		img: string
		aboutMe: string
		email: string
		phone: string
		residenceAddress: string
	}
	linksOfInterest: {
		name: string
		url: string
	}[]
}
