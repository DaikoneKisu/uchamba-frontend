export type ProjectEditionPayload = {
	name: string
	description: string
	projectUrl?: string
	coverImage: File | null
	images: Array<File | null>
	deletedImages: string[]
}
