import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import * as useAverageCPULoadModule from '../hooks/useAverageCPULoad'

// Mock useAverageCPULoad hook
const useAverageCPULoadMock = jest.spyOn(
  useAverageCPULoadModule,
  'useAverageCPULoad',
) as jest.Mock

import { CPU } from '.'

const queryClient = new QueryClient()
const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('CPU', () => {
  it('renders', () => {
    useAverageCPULoadMock.mockReturnValue({
      data: [{ time: 1712299157021, average: 0.5, formattedTime: '08:39:17' }],
      status: 'success',
    })

    render(
      <Wrapper>
        <CPU />
      </Wrapper>,
    )

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
