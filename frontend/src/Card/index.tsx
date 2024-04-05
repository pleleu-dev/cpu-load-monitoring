/**
 * Card component
 * @param {string} title - The title of the Card
 * @param {IconType} Icon - The Icon component
 * @param {React.ReactNode} children - The children of the Card
 * @Description UI Card component with title and Icon
 */

import card from './card.module.css'
import type { IconType } from 'react-icons'

type CardProps = {
  title: string
  Icon: IconType
  children: React.ReactNode
}

function Card({ title, Icon, children }: CardProps) {
  return (
    <>
      <header className={card.header}>
        <h2>{title}</h2>
        <Icon size={36} />
      </header>
      {children}
    </>
  )
}

export { Card }
