import type { Experience } from '../../../types/experience-data.type'

export function load() {
	const experience: Experience = {
		workExperience: [
			'Software Engineer at Google (2018-present)',
			'Software Engineer at Facebook (2016-2018)',
			'Software Engineer at Amazon (2014-2016)'
		],
		technologies: ['Spring Boot', 'React', 'Angular', 'AWS', 'Azure']
	}

	return experience
}
