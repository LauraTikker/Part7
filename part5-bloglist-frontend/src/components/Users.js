import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import { Table } from 'react-bootstrap'

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
  }, [dispatch])


  return (
    <div>
      {users !== null ?
        <div>
          <h2>Users</h2>
          <Table striped bordered hover>
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
          </Table>
        </div> : null}
    </div>
  )
}
export default Users
