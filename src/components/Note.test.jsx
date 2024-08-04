import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import { Note } from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    important: true,
  }

  render(<Note note={note} />)
  expect(screen.getByText(note.content)).toBeDefined()
})
