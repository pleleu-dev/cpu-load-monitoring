import axios from 'axios'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { renderHook, waitFor } from '@testing-library/react'
import { useAverageCPULoad } from './useAverageCPULoad'
import MockAdapter from 'axios-mock-adapter'

// mock local storage
const mockGetItem = jest.fn()
const mockSetItem = jest.fn()
const mockRemoveItem = jest.fn()
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: (...args: string[]) => mockGetItem(...args),
    setItem: (...args: string[]) => mockSetItem(...args),
    removeItem: (...args: string[]) => mockRemoveItem(...args),
  },
})

jest.useFakeTimers()
jest.setSystemTime(new Date(1712299157021).getTime())

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // turns retries off
      retry: false,
    },
  },
})

const recentApiDataMock = {
  cpu: {
    average: 0.5,
    time: 1712299157021,
  },
}

const recentLocalStorageData = JSON.stringify([
  {
    time: 1712299157021,
    average: 0.5,
    formattedTime: '08:39:17',
  },
])

const oldLocalStorageData = JSON.stringify([
  {
    time: 1712199157021,
    average: 0.5,
    formattedTime: '08:39:17',
  },
])

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('useAverageCPULoad', () => {
  let mock: MockAdapter

  beforeAll(() => {
    mock = new MockAdapter(axios)
  })

  beforeEach(() => {
    mockSetItem.mockClear()
    mockSetItem.mockClear()
  })

  afterEach(() => {
    mock.reset()
  })

  it(`should return only api data and add data to local storage 
    - when local storage data is older than 10mins`, async () => {
    mockGetItem.mockReturnValueOnce(oldLocalStorageData)

    mock.onGet(`/cpu-monitoring/average-load`).reply(200, recentApiDataMock)

    const { result } = renderHook(() => useAverageCPULoad(), {
      wrapper: Wrapper,
    })

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.data).toEqual([
      {
        average: 0.5,
        formattedTime: '8:39:17',
        time: 1712299157021,
      },
    ])

    expect(mockSetItem).toBeCalledWith(
      'averageLoad',
      JSON.stringify([result.current.data[0]]),
    )
  })

  it('should return stored data and api data when both are recent', async () => {
    mockGetItem.mockReturnValueOnce(recentLocalStorageData)

    mock.onGet(`/cpu-monitoring/average-load`).reply(200, recentApiDataMock)

    const { result } = renderHook(() => useAverageCPULoad(), {
      wrapper: Wrapper,
    })

    await waitFor(() => {
      expect(result.current.status).toBe('success')
    })

    expect(result.current.data).toEqual([
      {
        average: 0.5,
        formattedTime: '08:39:17',
        time: 1712299157021,
      },
      {
        average: 0.5,
        formattedTime: '8:39:17',
        time: 1712299157021,
      },
    ])
  })
})
