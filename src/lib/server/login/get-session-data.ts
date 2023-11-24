import { StatusCodes } from "$lib/utils/http-status-codes"

interface SessionData {
	id: number
	name: string
	email: string
	role: string
	token: string
}

export async function getSessionData(session: Response): Promise<SessionData> {
	if (session.status as StatusCodes === StatusCodes.UNAUTHORIZED) {
		// TODO: Throw unauthorized because this means that the user email or password is wrong
		throw new Error('Wrong email or password', { cause: session.status })
	}

	const sessionData = (await session.json()) as unknown

	if (!isSessionData(sessionData)) {
		// TODO: Throw server error because this means that the server is not responding what it should (the interface SessionData)
		throw new Error('Server error')
	}

	return sessionData
}

export function isSessionData(data: unknown): data is SessionData {
	const possiblySessionData = data as SessionData

	return (
		typeof possiblySessionData === 'object' &&
		possiblySessionData !== null &&
		typeof possiblySessionData.id === 'number' &&
		typeof possiblySessionData.name === 'string' &&
		typeof possiblySessionData.email === 'string' &&
		typeof possiblySessionData.role === 'string' &&
		typeof possiblySessionData.token === 'string' &&
		Object.keys(possiblySessionData).length === 5 &&
		Object.values(possiblySessionData).every((value) => value !== '' && !Number.isNaN(value))
	)
}
