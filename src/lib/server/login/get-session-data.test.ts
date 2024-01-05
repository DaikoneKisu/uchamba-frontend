import { describe, expect, test } from 'vitest'

import { isSessionData, getSessionData } from './get-session-data'

describe('isSessionData function', () => {
  test('it should return true for valid session data', () => {
    const data = {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      token: 'abc123'
    }

    expect(isSessionData(data)).toBe(true)
  }),
    test('it should return false for session data with undefined values', () => {
      const data = {
        id: 1,
        name: 'John Doe',
        email: undefined,
        role: 'admin',
        token: 'abc123'
      }

      expect(isSessionData(data)).toBe(false)
    }),
    test('it should return false for incomplete session data', () => {
      const data = {
        id: 1,
        name: '',
        role: 'user'
      }

      expect(isSessionData(data)).toBe(false)
    }),
    test('it should return false for session data with NaN values', () => {
      const data = {
        id: NaN,
        name: 'John Doe',
        email: 'john@email.com',
        role: 'user',
        token: 'wy001a/1'
      }

      expect(isSessionData(data)).toBe(false)
    }),
    test('it should return false for session data with empty values', () => {
      const data = {
        id: 1,
        name: '',
        email: '',
        role: '',
        token: ''
      }

      expect(isSessionData(data)).toBe(false)
    }),
    test('it should return false for session data with extra properties', () => {
      expect(
        isSessionData({
          id: 1,
          name: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
          role: 'admin',
          token: 'abc123'
        })
      ).toBe(false)

      expect(
        isSessionData({
          id: 1,
          name: 'John',
          lastname: 'Doe',
          email: 'john.doe@example.com',
          role: 'admin',
          subrole: 'developer',
          token: 'abc123',
          authLevel: 2
        })
      ).toBe(false)
    }),
    test('it should return false for something that is not a session data', () => {
      expect(isSessionData('')).toBe(false)
      expect(isSessionData(1)).toBe(false)
      expect(isSessionData(true)).toBe(false)
      expect(isSessionData(null)).toBe(false)
      expect(isSessionData(undefined)).toBe(false)
      expect(isSessionData([])).toBe(false)
      expect(isSessionData({})).toBe(false)
      expect(isSessionData(() => {})).toBe(false)
      expect(isSessionData(new Date())).toBe(false)
      expect(isSessionData(1n)).toBe(false)
      expect(isSessionData(Symbol())).toBe(false)
    })
})

describe('getSessionData function', () => {
  test('it should return a session data object for a valid session data response', async () => {
    const response = new Response(
      JSON.stringify({
        id: 1,
        name: 'Test user',
        email: 'test@email.com',
        role: 'test',
        token: 'test token'
      })
    )

    const sessionData = await getSessionData(response)

    expect(isSessionData(sessionData)).toBe(true)
  }),
    test('it should throw an error for an invalid session data response', async () => {
      expect.assertions(1)

      const response = new Response(
        JSON.stringify({
          id: 1,
          email: 'test@email.com',
          rol: 'test'
        })
      )

      await expect(() => getSessionData(response)).rejects.toThrow()
    }),
    test('it should throw an error for session status 401', async () => {
      expect.assertions(1)

      const response = new Response(
        JSON.stringify({
          id: 1,
          name: 'Test user',
          toke: 'test token'
        }),
        {
          status: 401
        }
      )

      await expect(() => getSessionData(response)).rejects.toThrow()
    }),
    test('it should throw an error for session status 401 no matter the body', async () => {
      expect.assertions(1)

      const response = new Response(
        JSON.stringify({
          id: 1,
          name: 'Test user',
          email: 'test@email.com',
          role: 'test',
          token: 'test token'
        }),
        {
          status: 401
        }
      )

      await expect(() => getSessionData(response)).rejects.toThrow()
    })
})
