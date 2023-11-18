import type { Portfolio } from '../../../types/portfolio.type'

export function load() {
	const portfolio: Portfolio = {
		projects: ['E-commerce platform', 'Social media platform', 'Mobile application']
	}

	return portfolio
}
