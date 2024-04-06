import renderer from 'react-test-renderer'

import { Heavy } from '.'
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
  {
    time: 1712299157021,
    average: 0.5,
    formattedTime: '08:39:17',
  },
  {
    time: 1712299158031,
    average: 2.6,
    formattedTime: '08:39:18',
  },
]

describe('Heavy', () => {
  it('should render correctly', () => {
    const tree = renderer.create(<Heavy data={data} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
