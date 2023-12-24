import 'vitest-dom/extend-expect'

import Form__SvelteComponent_ from './Form.svelte'
import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/svelte'

describe('Login Form Component', () => {
  test('it should render', () => {
    render(Form__SvelteComponent_)

    const form = screen.getByRole('form')

    expect(form).toBeInTheDocument()
  })

  test('it should render a submit button with inner text "Continuar"', () => {
    render(Form__SvelteComponent_)

    const button = screen.getByRole('button', { name: 'Continuar' })

    expect(button).toBeInTheDocument()
  })

  test('it should render a email input', () => {
    render(Form__SvelteComponent_)

    const input = screen.getByLabelText('Correo electrónico')

    expect(input).toBeInTheDocument()
  })

  test('it should render a password input', () => {
    render(Form__SvelteComponent_)

    const input = screen.getByLabelText('Contraseña')

    expect(input).toBeInTheDocument()
  })
})
