import 'vitest-dom/extend-expect'

import { render, screen, fireEvent } from '@testing-library/svelte'
import { describe, expect, test } from 'vitest'

import Input__SvelteComponent_ from './Input.svelte'

describe('Input Component', () => {
  test('it should render', () => {
    render(Input__SvelteComponent_, { type: 'text', label: 'test-label' })
    const input = screen.getByRole('textbox', { name: 'test-label' })
    expect(input).toBeInTheDocument()
  })

  test('it should store value when typing in input', async () => {
    const initialValue = 'test-'

    render(Input__SvelteComponent_, {
      type: 'text',
      value: initialValue,
      placeholder: 'test-placeholder',
      label: 'test-label'
    })
    const input: HTMLInputElement = screen.getByPlaceholderText('test-placeholder')
    await fireEvent.change(input, { target: { value: input.value + 'input' } })

    expect(input.value).toBe('test-input')
  })

  test('it should be required if specified', () => {
    render(Input__SvelteComponent_, {
      type: 'text',
      required: true,
      name: 'test-name',
      label: 'test-label'
    })

    const input: HTMLInputElement = screen.getByLabelText('test-label')

    expect(input.required).toBe(true)
  })

  test('it should not be required if specified', () => {
    render(Input__SvelteComponent_, {
      type: 'text',
      required: false,
      name: 'test-name',
      label: 'test-label'
    })

    const input: HTMLInputElement = screen.getByLabelText('test-label')

    expect(input.required).toBe(false)
  })
})
