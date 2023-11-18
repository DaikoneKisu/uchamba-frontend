import type { Education } from '../../../types/education.type'

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
