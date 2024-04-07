import { render, screen } from '@testing-library/react'

import { Notification } from '.'

describe('Notification', () => {
  it('renders a message for the user', () => {
    render(<Notification status='idle' />)
    expect(screen.getByText('No data available')).toBeInTheDocument()

    render(<Notification status='pending' />)
    expect(
      screen.getByText('Retrieving current CPU load data...'),
    ).toBeInTheDocument()

    render(<Notification status='error' />)
    expect(
      screen.getByText('Failed to retrieve CPU load data'),
    ).toBeInTheDocument()

    render(<Notification status='success' />)
    expect(screen.getByText('Showing average CPU load')).toBeInTheDocument()
  })
})
