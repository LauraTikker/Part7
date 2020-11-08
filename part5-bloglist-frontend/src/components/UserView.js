import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserView = () => {
  const id = useParams().id

  const allUsers = useSelector(state => state.users)
  const oneUser = allUsers.find(user => user.id === id)

  return (
    <div>
      {allUsers.length !== 0 ?
        <div>
          <h2>{oneUser.name}</h2>
          <h4>Added blogs:</h4>
          {oneUser.blogs.map(blog => {
            return (<li key={blog.id}>{blog.title}</li>)
          })}
        </div> : null}
    </div>
  )
}
export default UserView
