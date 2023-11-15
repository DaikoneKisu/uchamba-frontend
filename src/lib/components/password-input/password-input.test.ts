import 'vitest-dom/extend-expect'

import { render, screen } from '@testing-library/svelte'
import { describe, expect, test } from 'vitest'
import PasswordInput__SvelteComponent_ from './PasswordInput.svelte'

describe('Password Input Component', () => {
	test('it should render', () => {
		render(PasswordInput__SvelteComponent_, { label: 'password' })
		const input = screen.getByLabelText('password')
        expect(input).toBeInTheDocument()
	})
})
