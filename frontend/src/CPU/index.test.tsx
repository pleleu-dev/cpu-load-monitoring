import { render, screen } from '@testing-library/react'

import { CPU } from '.'

describe('CPU', () => {
  it('renders', () => {
    render(<CPU />)

    const current = screen.getByRole('heading', {
      level: 2,
      name: 'Current average load',
    })
    expect(current).toBeInTheDocument()

    const average = screen.getByRole('heading', {
      level: 2,
      name: 'Average load',
    })
    expect(average).toBeInTheDocument()

    const recovery = screen.getByRole('heading', {
      level: 2,
      name: 'Recovery summary',
    })
    expect(recovery).toBeInTheDocument()

    const heavy = screen.getByRole('heading', {
      level: 2,
      name: 'CPU heavy load',
    })
    expect(heavy).toBeInTheDocument()
  })
})
