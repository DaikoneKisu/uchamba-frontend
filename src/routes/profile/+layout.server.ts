import type { ProfileData } from '../../types/profile-data.type'

export function load() {
	const profileData: ProfileData = {
		personalInformation: {
			name: 'Jane Doe',
			img: 'https://cdn.unotv.com/images/2023/09/el-licenciado-michi-ayuntamiento-veracruz-112105.jpg',
			aboutMe:
				'A dedicated and experienced software developer with a passion for creating innovative and user-friendly applications. Possesses a strong command of programming languages and frameworks, along with a knack for problem-solving and collaboration.',
			email: 'jane.doe@example.com',
			phone: '+1 555-555-5555',
			residenceAddress: '123 Main Street, Anytown, CA 94538'
		},
		linksOfInterest: [
			{
				name: 'LinkedIn Profile',
				url: 'https://www.linkedin.com/in/jane-doe'
			},
			{
				name: 'Portfolio',
				url: 'https://www.portfolio.com/jane-doe'
			}
		]
	}

	return profileData
}
