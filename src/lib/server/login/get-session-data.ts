import { string, object, number, ObjectSchema } from 'yup'

import { StatusCodes } from '$lib/utils/http-status-codes'

interface SessionData {
  id: number
  name: string
  email: string
  role: string
  token: string
}

const sessionDataSchema: ObjectSchema<SessionData> = object({
  id: number().required(),
  name: string().required(),
  email: string().required(),
  role: string().required(),
  token: string().required()
})

export async function getSessionData(session: Response): Promise<SessionData> {
  if ((session.status as StatusCodes) === StatusCodes.UNAUTHORIZED) {
    throw new Error('Wrong email or password', { cause: session.status })
  }

  const sessionData = (await session.json()) as unknown

  if (!isSessionData(sessionData)) {
    // Throw server error because this means that the server is not responding what it should (the interface SessionData)
    throw new Error('Internal server error', { cause: StatusCodes.INTERNAL_SERVER_ERROR })
  }

  return sessionData
}

export const isSessionData = (data: unknown): data is SessionData =>
  typeof data !== 'bigint' && sessionDataSchema.isValidSync(data) && Object.keys(data).length === 5
