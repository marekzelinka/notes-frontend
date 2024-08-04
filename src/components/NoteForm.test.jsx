import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { NoteForm } from './NoteForm.jsx'

test('<NoteForm /> updates parent state and calls onSubmit', async () => {
  const mockOnSubmit = vi.fn(() => {
    return { success: true }
  })

  const user = userEvent.setup()

  render(<NoteForm onSubmit={mockOnSubmit} />)

  const newNote = 'testing a form...'

  await user.type(screen.getByLabelText(/New note/i), newNote)
  await user.click(screen.getByRole('button', { name: /save/i }))

  expect(mockOnSubmit.mock.calls).toHaveLength(1)
  expect(mockOnSubmit.mock.calls[0][0].content).toBe(newNote)
})
