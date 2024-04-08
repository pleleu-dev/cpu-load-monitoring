import { render, screen } from '@testing-library/react'
import { Notification } from '.'
import type { Load } from '../types'

const lowLoad: Load = {
  time: 1712299157021,
  average: 0.5,
  formattedTime: '08:39:17',
}

const heavyLoad: Load = {
  time: 1712299158031,
  average: 2.6,
  formattedTime: '08:39:18',
}

describe('Notification', () => {
  it('renders a message for the user', () => {
    render(<Notification status='idle' data={[]} />)
    expect(screen.getByText('No data available')).toBeInTheDocument()

    render(<Notification status='pending' data={[]} />)
    expect(
      screen.getByText('Retrieving current CPU load data...'),
    ).toBeInTheDocument()

    render(<Notification status='error' data={[]} />)
    expect(
      screen.getByText('Failed to retrieve CPU load data'),
    ).toBeInTheDocument()

    render(<Notification status='success' data={[lowLoad]} />)
    expect(screen.getByText('Showing average CPU load')).toBeInTheDocument()

    render(<Notification status='success' data={[lowLoad, heavyLoad]} />)
    expect(screen.getByText('HEAVY CPU LOAD')).toBeInTheDocument()

    render(<Notification status='success' data={[heavyLoad, lowLoad]} />)
    expect(screen.getByText('Recovery from heavy CPU load')).toBeInTheDocument()
  })
})
