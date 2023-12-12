import type { ProfileData } from '../../types/profile-data.type'

export async function load() {
	const res = await fetch('https://uchamba-backend-staging.1.us-1.fl0.io/users/4')
	const data = (await res.json()) as ProfileData

	console.log(data.education.personal)
	return data
}
