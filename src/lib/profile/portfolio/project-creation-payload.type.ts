export type ProjectCreationPayload = {
	name: string
	description: string
	projectUrl?: string
	coverImage: File | null
	images: File[]
}
