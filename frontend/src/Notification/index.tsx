/**
 * Notification component
 * @param {string} status - status of the notification of the data
 * @description This component is used to display message to the user
 */

import notification from './notification.module.css'

type NotificationProps = {
  status: string
}

function Notification({ status }: NotificationProps) {
  let message = 'Showing average CPU load'

  const style =
    status === 'error'
      ? `${notification.message} ${notification.error}`
      : `${notification.message}`

  if (status === 'pending') {
    message = 'Retrieving current CPU load data...'
  } else if (status === 'error') {
    message = 'Failed to retrieve CPU load data'
  } else if (status === 'idle') {
    message = 'No data available'
  }

  return <p className={style}>{message}</p>
}

export { Notification }
