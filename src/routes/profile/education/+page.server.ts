//TODO: solicitar los datos desde el backend
export function load() {
	const educationData = {
		education: {
			featured: [
				{
					studyId: 1,
					name: 'Ingeniería Informática',
					universityName: 'Universidad Católica Andrés Bello',
					degree: 'pregrado',
					graduationDate: '25/11/2023',
					createdAt: '25/11/2023 - 09:35 AM',
					updatedAt: '25/11/2023 - 09:35 AM'
				}
			],
			personal: [
				{
					studyId: 2,
					name: 'Ingeniería Civil',
					universityName: 'Universidad Complutense de Madrid',
					degree: 'postgrado',
					graduationDate: '25/11/2023',
					createdAt: '25/11/2023 - 09:35 AM',
					updatedAt: '25/11/2023 - 09:35 AM'
				}
			]
		},
		languages: [
			{
				languageId: 1,
				name: 'Inglés',
				proficientLevel: 'B2',
				createdAt: '25/11/2023 - 09:50 AM',
				updatedAt: '25/11/2023 - 09:50 AM'
			}
		],
		softSkills: {
			featured: [
				{
					skillId: 3,
					name: 'Inteligencia Emocional',
					createdAt: '25/11/2023 - 09:30 AM',
					updatedAt: '25/11/2023 - 09:30 AM'
				}
			],
			personal: [
				{
					skillId: 1,
					name: 'Pensamiento Crítico',
					createdAt: '25/11/2023 - 09:25 AM',
					updatedAt: '25/11/2023 - 09:25 AM'
				},
				{
					skillId: 2,
					name: 'Comunicación Asertiva',
					createdAt: '25/11/2023 - 09:30 AM',
					updatedAt: '25/11/2023 - 09:30 AM'
				},
				{
					skillId: 1,
					name: 'Pensamiento Crítico',
					createdAt: '25/11/2023 - 09:25 AM',
					updatedAt: '25/11/2023 - 09:25 AM'
				},
				{
					skillId: 2,
					name: 'Comunicación Asertiva',
					createdAt: '25/11/2023 - 09:30 AM',
					updatedAt: '25/11/2023 - 09:30 AM'
				},
				{
					skillId: 1,
					name: 'Pensamiento Crítico',
					createdAt: '25/11/2023 - 09:25 AM',
					updatedAt: '25/11/2023 - 09:25 AM'
				},
				{
					skillId: 2,
					name: 'Comunicación Asertiva',
					createdAt: '25/11/2023 - 09:30 AM',
					updatedAt: '25/11/2023 - 09:30 AM'
				},
			]
		},
		hardSkills: {
			featured: [
				{
					skillId: 1,
					name: 'React',
					createdAt: '25/11/2023 - 09:20 AM',
					updatedAt: '25/11/2023 - 09:20 AM'
				}
			],
			personal: [
				{
					skillId: 1,
					name: 'Manejo de Base de Datos',
					createdAt: '25/11/2023 - 09:20 AM',
					updatedAt: '25/11/2023 - 09:21 AM'
				},
				{
					skillId: 2,
					name: 'Conocimiento en Paradigmas de Programación',
					createdAt: '25/11/2023 - 09:25 AM',
					updatedAt: '25/11/2023 - 09:25 AM'
				},{
					skillId: 1,
					name: 'Manejo de Base de Datos',
					createdAt: '25/11/2023 - 09:20 AM',
					updatedAt: '25/11/2023 - 09:21 AM'
				},
				{
					skillId: 2,
					name: 'Conocimiento en Paradigmas de Programación',
					createdAt: '25/11/2023 - 09:25 AM',
					updatedAt: '25/11/2023 - 09:25 AM'
				},{
					skillId: 1,
					name: 'Manejo de Base de Datos',
					createdAt: '25/11/2023 - 09:20 AM',
					updatedAt: '25/11/2023 - 09:21 AM'
				},
				{
					skillId: 2,
					name: 'Conocimiento en Paradigmas de Programación',
					createdAt: '25/11/2023 - 09:25 AM',
					updatedAt: '25/11/2023 - 09:25 AM'
				}
			]
		}
	}

	return educationData
}
