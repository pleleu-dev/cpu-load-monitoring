import React from 'react'
import { act, renderHook } from '@testing-library/react'
import { useLocalStorage } from './useLocalStorage'

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

const storageData = JSON.stringify([
  {
    time: 1712299157021,
    average: 0.5,
    formattedTime: '08:39:17',
  },
])

describe('useLocalStorage', () => {
  beforeEach(() => {
    mockSetItem.mockClear()
    mockSetItem.mockClear()
  })

  it('should return default data', async () => {
    const { result } = renderHook(() =>
      useLocalStorage({
        key: 'averageLoad',
        defaultValue: [
          {
            time: 1712299157021,
            average: 0.5,
            formattedTime: '08:39:17',
          },
        ],
      }),
    )

    expect(result.current[0]).toEqual([
      {
        average: 0.5,
        formattedTime: '08:39:17',
        time: 1712299157021,
      },
    ])
  })

  it('should return stored data', async () => {
    mockGetItem.mockReturnValueOnce(storageData)

    const { result } = renderHook(() =>
      useLocalStorage({ key: 'averageLoad', defaultValue: [] }),
    )

    expect(result.current[0]).toEqual([
      {
        average: 0.5,
        formattedTime: '08:39:17',
        time: 1712299157021,
      },
    ])
  })

  it('should set data in local storage', async () => {
    const { result } = renderHook(() =>
      useLocalStorage({ key: 'averageLoad', defaultValue: storageData }),
    )
    const setFunction = result.current[1] as React.Dispatch<
      React.SetStateAction<unknown>
    >

    act(() => {
      setFunction([
        {
          average: 0.5,
          formattedTime: '08:39:17',
          time: 1712299157021,
        },
      ])
    })

    expect(mockSetItem).toHaveBeenCalledWith(
      'averageLoad',
      '"[{\\"time\\":1712299157021,\\"average\\":0.5,\\"formattedTime\\":\\"08:39:17\\"}]"',
    )
  })
})
