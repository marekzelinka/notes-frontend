import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import { Note } from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  render(<Note note={note} />)
  screen.getByText(note.content)
})

test('clicking the toggle button calls event handler once', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  const mockOnToggleImportance = vi.fn()

  render(<Note note={note} onToggleImportance={mockOnToggleImportance} />)

  const user = userEvent.setup()
  await user.click(screen.getByRole('button', { name: /make not important/i }))
  expect(mockOnToggleImportance.mock.calls).toHaveLength(1)
})
