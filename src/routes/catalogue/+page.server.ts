import type { graduatedInfo } from '$lib/types/graduated-info.type'

export function load() {
	const items: graduatedInfo[] = [
		{
			name: 'Alice Johnson',
			address: {
				country: 'United Kingdom',
				state: 'England',
				city: 'London'
			},
			featuredEducations: [
				{
					name: "Bachelor's in Economics"
				},
				{
					name: "Master's in Finance"
				}
			],
			languages: [
				{
					name: 'English',
					proficientLevel: 'Native'
				},
				{
					name: 'Spanish',
					proficientLevel: 'Intermediate'
				}
			],
			aboutMe:
				'I am an economist with a focus on finance. My goal is to contribute to economic stability and growth. I have a passion for languages and enjoy connecting with people from different backgrounds.',
			skills: {
				softSkills: [
					{
						name: 'Analytical Thinking'
					},
					{
						name: 'Leadership'
					},
					{
						name: 'Cross-Cultural Communication'
					}
				],
				hardSkills: [
					{
						name: 'Financial Analysis'
					},
					{
						name: 'Risk Management'
					},
					{
						name: 'Data Modeling'
					}
				]
			}
		},
		{
			name: 'Mohammed Ahmed',
			address: {
				country: 'United Arab Emirates',
				state: 'Dubai',
				city: 'Dubai'
			},
			featuredEducations: [
				{
					name: "Bachelor's in Computer Engineering"
				},
				{
					name: "Master's in Artificial Intelligence"
				}
			],
			languages: [
				{
					name: 'Arabic',
					proficientLevel: 'Native'
				},
				{
					name: 'English',
					proficientLevel: 'Fluent'
				}
			],
			aboutMe:
				'I am a computer engineer specializing in artificial intelligence. I have a keen interest in cutting-edge technologies and their applications. My diverse language skills help me collaborate with global teams effectively.',
			skills: {
				softSkills: [
					{
						name: 'Problem Solving'
					},
					{
						name: 'Collaboration'
					},
					{
						name: 'Adaptability'
					}
				],
				hardSkills: [
					{
						name: 'Machine Learning'
					},
					{
						name: 'Natural Language Processing'
					},
					{
						name: 'Python Programming'
					}
				]
			}
		},
		{
			name: 'Jane Smith',
			address: {
				country: 'Canada',
				state: 'Ontario',
				city: 'Toronto'
			},
			featuredEducations: [
				{
					name: "Bachelor's in Marketing"
				},
				{
					name: "Master's in Public Relations"
				}
			],
			languages: [
				{
					name: 'French',
					proficientLevel: 'Advanced'
				},
				{
					name: 'German',
					proficientLevel: 'Basic'
				}
			],
			aboutMe:
				'I am a dedicated marketer with expertise in public relations. I have a passion for creative campaigns and strategic communication. Outside of work, I enjoy learning new languages and exploring different cultures.',
			skills: {
				softSkills: [
					{
						name: 'Creativity'
					},
					{
						name: 'Strategic Thinking'
					},
					{
						name: 'Time Management'
					}
				],
				hardSkills: [
					{
						name: 'Social Media Marketing'
					},
					{
						name: 'Brand Management'
					},
					{
						name: 'Event Planning'
					}
				]
			}
		}
	]

	return { items }
}
