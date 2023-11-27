import type { ProfileData } from '../../types/profile-data.type'

export async function load() {
	const exampleData = {
		userId: 5,
		name: 'Eduardo Sucre',
		email: 'ejsucre.19@est.ucab.edu.ve',
		aboutMe: 'Soy Daz Bonez',
		phoneNumber: '04121320792',
		residenceAddress: 'Direccion 5',
		role: 'admin',
		isVerified: true,
		createdAt: '26/11/2023 - 07:40 PM',
		updatedAt: '26/11/2023 - 07:40 PM',
		languages: [
			{
				languageId: 5,
				name: 'Italiano',
				proficientLevel: 'C1',
				createdAt: '26/11/2023 - 07:40 PM',
				updatedAt: '26/11/2023 - 07:40 PM'
			},
			{
				languageId: 13,
				name: 'Bengali',
				proficientLevel: 'A1',
				createdAt: '26/11/2023 - 07:40 PM',
				updatedAt: '26/11/2023 - 07:40 PM'
			}
		],
		personalLinks: [
			{
				linkId: 5,
				name: 'Personal Blog',
				url: 'https://media.istockphoto.com/id/1251693104/es/vector/poo-emoticon-emoji-cara-de-caca-ilustracion-vectorial.jpg?s=612x612&w=0&k=20&c=tzIypiPXr1F0r6EAJLhXebSRhtqUeBxdEz2Et1VNBoE=',
				createdAt: '26/11/2023 - 07:40 PM',
				updatedAt: '26/11/2023 - 07:40 PM'
			}
		],
		hardSkills: {
			featured: [
				{
					skillId: 9,
					name: 'Angular',
					createdAt: '26/11/2023 - 07:45 PM'
				},
				{
					skillId: 10,
					name: 'Node.js',
					createdAt: '26/11/2023 - 07:45 PM'
				}
			],
			personal: [
				{
					skillId: 5,
					name: 'Web Development',
					createdAt: '26/11/2023 - 07:40 PM'
				}
			]
		},
		softSkills: {
			featured: [
				{
					skillId: 9,
					name: 'Conflict Resolution',
					createdAt: '26/11/2023 - 07:46 PM'
				},
				{
					skillId: 10,
					name: 'Critical Thinking',
					createdAt: '26/11/2023 - 07:46 PM'
				}
			],
			personal: [
				{
					skillId: 5,
					name: 'Creativity',
					createdAt: '26/11/2023 - 07:40 PM'
				},
				{
					skillId: 13,
					name: 'Flexibility',
					createdAt: '26/11/2023 - 07:40 PM'
				}
			]
		},
		education: {
			featured: [
				{
					ucareerId: 5,
					name: 'Educacion',
					degree: 'maestria',
					graduationDate: '25/09/2021',
					createdAt: '26/11/2023 - 07:40 PM'
				}
			],
			personal: [
				{
					studyId: 5,
					name: 'Study Abroad 5',
					universityName: 'Foreign University 5',
					degree: 'pregrado',
					graduationDate: '10/02/2024',
					createdAt: '26/11/2023 - 07:52 PM'
				},
				{
					studyId: 13,
					name: 'Study Abroad 13',
					universityName: 'Foreign University 13',
					degree: 'pregrado',
					graduationDate: '07/08/2023',
					createdAt: '26/11/2023 - 07:52 PM'
				}
			]
		},
		workExperiences: [
			{
				workExpId: 1,
				organizationName: 'Lusitanos',
				jobTitle: 'Auxiliar de equipo',
				address: 'Urbanizacion Moreno De Mendoza',
				description: 'Una recarga de agua con una panaderia al lado',
				entryDate: '13/04/2016',
				departureDate: '31/10/2022',
				createdAt: '26/11/2023 - 07:40 PM'
			},
			{
				workExpId: 2,
				organizationName: 'Santo Tome',
				jobTitle: 'Empaquetador',
				address: 'Los olivos',
				description: 'Embolsaba las compras de los clientes y los ayudaba a llevarlas',
				entryDate: '10/10/2010',
				departureDate: '12/04/2015',
				createdAt: '26/11/2023 - 07:40 PM'
			}
		],
		projects: [
			{
				projectId: 5,
				name: 'Proyecto de IHC',
				description: 'Sistema de gestion de la biblioteca UCAB',
				projectUrl: '',
				createdAt: '26/11/2023 - 07:40 PM',
				updatedAt: '26/11/2023 - 07:40 PM'
			}
		]
	}

	const res = await fetch('https://uchamba-backend-staging.1.us-1.fl0.io/users/5')
	const data = (await res.json()) as typeof exampleData
	console.log(data)

	return data
}
