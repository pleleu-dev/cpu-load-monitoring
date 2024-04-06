import { render, screen } from '@testing-library/react'
import { Current } from '.'
import { HEAVY_LIMIT } from '../constants'

import type { Load } from '../types'

const lowLoad: Load = {
  time: 1712299157021,
  average: 0.5,
  formattedTime: '08:39:17',
}

const heavyLoad: Load = {
  time: 1712299158031,
  average: 2.612,
  formattedTime: '08:39:18',
}

describe('Current', () => {
  it('renders the average load when it is available', () => {
    render(<Current data={[heavyLoad, lowLoad]} />)
    expect(screen.getByText('0.50')).toBeInTheDocument()
    expect(screen.getByText('1 min load average')).toBeInTheDocument()
  })

  it('renders a loading message when the average load is not available', () => {
    render(<Current data={[]} />)
    expect(screen.getByText('No data available.')).toBeInTheDocument()
  })

  it(`renders an indicator for low load when the average load is less than ${HEAVY_LIMIT}`, () => {
    render(<Current data={[heavyLoad, lowLoad]} />)
    expect(screen.getByText('0.50').className).toContain('indicator-low')
  })

  it(`renders an indicator for heavy load when the average load is greater than ${HEAVY_LIMIT}`, () => {
    render(<Current data={[lowLoad, heavyLoad]} />)
    expect(screen.getByText('2.61').className).toContain('indicator-heavy')
  })
})
