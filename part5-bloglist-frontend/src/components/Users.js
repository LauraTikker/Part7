import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'

const Users = () => {
  const [users, setUsers] = useState(null)
  const dispatch = useDispatch()

  useEffect(() => {
    async function getUsers() {
      return await dispatch(initUsers())
    }

    getUsers().then(
      result => {
        const usersWithBlogs = result.map(user => {
          return ({
            name: user.name,
            blognumber: user.blogs.length,
            id: user.id
          })
        })
        setUsers(usersWithBlogs)
      }
    )
  }, [])


  return (
    <div>
      {users !== null ?
        <div>
          <h2>Users</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount of blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => {
                return (<tr key={user.id}>
                  <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
                  <td>{user.blognumber}</td>
                </tr>)
              })}
            </tbody>
          </table>
        </div> : null}
    </div>
  )
}
export default Users
