import type { Education } from '../../../types/education.type'

//TODO: solicitar los datos desde el backend
export function load() {
	const educationData: Education = {
		academicTraining: [
			'Bachelor of Science in Computer Science from Stanford University',
			'Master of Science in Software Engineering from MIT'
		],
		languages: ['English', 'Spanish', 'French'],
		skills: ['Java', 'Python', 'C++', 'JavaScript', 'HTML', 'CSS']
	}

	return educationData
}
