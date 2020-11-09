import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  if (notification.type === 'success') {
    return (
      <Alert variant='success'>{notification.message}</Alert>
    )
  }

  if (notification.type === 'error')  {
    return (
      <Alert variant='danger'>{notification.message}</Alert>
    )
  }
  return null
}

export default Notification