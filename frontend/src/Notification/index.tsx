/**
 * Notification component
 * @param {string} status - status of the notification of the data
 * @description This component is used to display message to the user
 */

import notification from './notification.module.css'
import { Load } from '../types'

type NotificationProps = {
  status: string
  data: Load[]
}

function Notification({ status, data }: NotificationProps) {
  let message = 'Showing average CPU load'
  let isWarning = false

  if (status === 'pending') {
    message = 'Retrieving current CPU load data...'
  } else if (status === 'error') {
    message = 'Failed to retrieve CPU load data'
    isWarning = true
  } else if (status === 'idle') {
    message = 'No data available'
  } else if (data.length > 1) {
    const last = data[data.length - 1]
    const previous = data[data.length - 2]

    if (last.average > 1) {
      message = 'HEAVY CPU LOAD'
      isWarning = true
    } else if (last.average < 1 && previous.average > 1) {
      message = 'Recovery from heavy CPU load'
    }
  }

  const style = isWarning
    ? `${notification.message} ${notification.error}`
    : `${notification.message}`

  return <p className={style}>{message}</p>
}

export { Notification }
