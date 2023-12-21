export type ProjectEditionPayload = {
	projectId: number
	name: string
	description: string
	projectUrl: string
	coverImage: File | null
	coverImageId: string | null
	images: Array<File | null>
	deletedImages: string[]
}
