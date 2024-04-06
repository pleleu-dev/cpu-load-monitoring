import { render, screen } from '@testing-library/react'

import App from './index'

describe('App', () => {
  it('renders', () => {
    render(<App />)
    const header = screen.getByRole('heading', {
      level: 1,
      name: 'CPU Load Monitoring',
    })
    expect(header).toBeInTheDocument()

    const current = screen.getByRole('heading', {
      level: 2,
      name: 'Current average load',
    })
    expect(current).toBeInTheDocument()
  })
})
