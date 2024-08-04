import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { LoginForm } from './LoginForm.jsx'

test('<LoginForm /> updates parent state and calls onSubmit', async () => {
  const mockOnSubmit = vi.fn(() => {
    return { success: true }
  })

  render(<LoginForm onSubmit={mockOnSubmit} />)

  const username = 'mzelinka'
  const password = '132456'
  const user = userEvent.setup()

  await user.type(screen.getByLabelText(/username/i), username)
  await user.type(screen.getByLabelText(/password/i), password)
  await user.click(screen.getByRole('button', { name: /login/i }))

  expect(mockOnSubmit.mock.calls).toHaveLength(1)
  expect(mockOnSubmit.mock.calls[0][0]).toStrictEqual({ username, password })
})
