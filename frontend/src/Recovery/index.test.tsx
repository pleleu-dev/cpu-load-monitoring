import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'
import { Recovery } from '.'

import type { Load } from '../types'
const data: Load[] = [
  {
    time: 1712299160001,
    average: 0.3,
    formattedTime: '08:39:20',
  },
  {
    time: 1712299156011,
    average: 1.4,
    formattedTime: '08:39:16',
  },
]

const lowLoad: Load = {
  time: 1712299157021,
  average: 0.5,
  formattedTime: '08:39:17',
}

const lowLoad2: Load = {
  time: 1712299158031,
  average: 0.9,
  formattedTime: '08:39:18',
}

const heavyLoad: Load = {
  time: 1712299158031,
  average: 2.6,
  formattedTime: '08:39:18',
}

describe('Recovery', () => {
  it('renders "No data available." when there is no data', () => {
    render(<Recovery data={[]} />)
    expect(screen.getByText('No data available.')).toBeInTheDocument()
  })

  it('renders the recovery grid with the correct squares', () => {
    render(<Recovery data={data} />)
    const squares = screen.getAllByRole('gridcell')
    const lowSquare = squares[0]
    const heavySquare = squares[1]

    expect(lowSquare).toHaveClass('square-low')
    expect(heavySquare).toHaveClass('square-heavy')
    expect(squares).toHaveLength(2)
  })

  it('renders the correct tooltip for each square', () => {
    render(<Recovery data={data} />)
    const tooltips = screen.getAllByRole('tooltip')
    const lowTooltip = tooltips[0]
    const heavyTooltip = tooltips[1]

    expect(lowTooltip).toHaveTextContent('08:39:20')
    expect(heavyTooltip).toHaveTextContent('08:39:16')

    userEvent.hover(lowTooltip)

    expect(lowTooltip).toBeVisible()
  })

  it('renders "Under heavy load" when the current load is above 1', () => {
    render(<Recovery data={[...data, heavyLoad]} />)
    expect(screen.getByText('Under heavy load')).toBeInTheDocument()
  })

  it('renders the last recovery time when the current load is below 1', () => {
    render(<Recovery data={[...data, lowLoad]} />)
    expect(screen.getByText('Last recovery at 08:39:20')).toBeInTheDocument()
  })

  it('renders the first recovery time when there is no heavy load', () => {
    render(<Recovery data={[lowLoad, lowLoad2]} />)
    expect(screen.getByText('Last recovery at 08:39:17')).toBeInTheDocument()
  })
})
