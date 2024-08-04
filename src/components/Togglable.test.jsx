import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, test } from 'vitest'
import { Togglable } from './Togglable.jsx'

describe('<Togglable />', () => {
  beforeEach(() => {
    render(<Togglable openButtonLabel="show...">togglable content</Togglable>)
  })

  test('renders its children', async () => {
    await screen.findByText(/togglable content/i)
  })

  test('children are hidden at start', () => {
    expect(screen.getByTestId('togglable-content')).not.toBeVisible()
  })

  test('after toggling visibility, children are displayed', async () => {
    const user = userEvent.setup()

    await user.click(screen.getByRole('button', { name: /show/i }))
    expect(screen.getByTestId('togglable-content')).toBeVisible()
  })

  describe('with toggled children', () => {
    beforeEach(async () => {
      const user = userEvent.setup()

      await user.click(screen.getByRole('button', { name: /show/i }))
    })

    test('can be toggled back', async () => {
      const user = userEvent.setup()

      await user.click(screen.getByRole('button', { name: /cancel/i }))
      expect(screen.getByTestId('togglable-content')).not.toBeVisible()
    })
  })
})
