import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  useEffect(() => {
    window.scrollTo(0, 0)
  })

  if (notification.type === 'success') {
    return (
      <div className="success">
        {notification.message}
      </div>
    )
  }

  if (notification.type === 'error')  {
    return (
      <div className="error">
        {notification.message}
      </div>
    )
  }
  return null
}

export default Notification