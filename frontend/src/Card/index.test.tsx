import { render, screen } from '@testing-library/react'
import { FaReact } from 'react-icons/fa'
import { Card } from '.'

describe('Card', () => {
  it('renders', () => {
    render(
      <Card title='Test Card' Icon={FaReact}>
        <p>Test Card Content</p>
      </Card>,
    )

    const header = screen.getByRole('heading', { level: 2 })

    expect(header).toBeInTheDocument()
    expect(header).toHaveTextContent('Test Card')
    expect(screen.getByText('Test Card Content')).toBeInTheDocument()
  })
})
