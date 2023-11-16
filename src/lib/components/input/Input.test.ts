import 'vitest-dom/extend-expect'

import { render, screen, fireEvent } from '@testing-library/svelte'
import { describe, expect, test } from 'vitest'

import InputWithIcon__SvelteComponent_ from './InputWithIcon.svelte'
import email from '$lib/icons/email.svg'

describe('Input Component', () => {
	test('it should render', () => {
		render(InputWithIcon__SvelteComponent_, { type: 'text', label: 'test-label', src: email })
		const label = screen.getByLabelText('test-label')

		expect(label).toBeInTheDocument()
	})

	test('it should store value when typing in input', async () => {
		const initialValue = 'test-'

		render(InputWithIcon__SvelteComponent_, {
			type: 'text',
			value: initialValue,
			placeholder: 'test-placeholder',
			src: email
		})
		const input: HTMLInputElement = screen.getByPlaceholderText('test-placeholder')
		await fireEvent.change(input, { target: { value: input.value + 'input' } })

		expect(input.value).toBe('test-input')
	})

})
