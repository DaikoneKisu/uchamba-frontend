import 'vitest-dom/extend-expect'

import { render, screen } from '@testing-library/svelte'
import { describe, expect, test } from 'vitest'

import SignInLogInSwitchButton__SvelteComponent_ from './SignUpLogInSwitchButton.svelte'

describe('Sign In and Log In Button Component', () => {
	test('it should render', () => {
		render(SignInLogInSwitchButton__SvelteComponent_, {
			chosen: 'Iniciar sesión',
			logInUrl: '#',
			signInUrl: '#'
		})
		const buttons = screen.getAllByRole('button')

		for (const button of buttons) {
			expect(button).toBeInTheDocument()
		}
	})

	test('it should highlight log in button when on log in', () => {
		render(SignInLogInSwitchButton__SvelteComponent_, {
			chosen: 'Iniciar sesión',
			logInUrl: '#',
			signInUrl: '#'
		})
		const button: HTMLButtonElement = screen.getByRole('button', { name: 'Iniciar sesión' })

		expect(button.className).toMatch(/.*?bg-(?:.+).*?/)
	})

	test('it should not highlight sign in button when on log in', () => {
		render(SignInLogInSwitchButton__SvelteComponent_, {
			chosen: 'Iniciar sesión',
			logInUrl: '#',
			signInUrl: '#'
		})
		const button: HTMLButtonElement = screen.getByRole('button', { name: 'Registrarse' })

		expect(button.className).not.toMatch(/.*?bg-(?:.+).*?/)
	})

	test('it should highlight sign in button when on sign in', () => {
		render(SignInLogInSwitchButton__SvelteComponent_, {
			chosen: 'Registrarse',
			logInUrl: '#',
			signInUrl: '#'
		})
		const button: HTMLButtonElement = screen.getByRole('button', { name: 'Registrarse' })

		expect(button.className).toMatch(/.*?bg-(?:.+).*?/)
	})

	test('it should not highlight log in button when on sign in', () => {
		render(SignInLogInSwitchButton__SvelteComponent_, {
			chosen: 'Registrarse',
			logInUrl: '#',
			signInUrl: '#'
		})
		const button: HTMLButtonElement = screen.getByRole('button', { name: 'Iniciar sesión' })

		expect(button.className).not.toMatch(/.*?bg-(?:.+).*?/)
	})
})
