import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logUserIn } from '../reducers/userReducer'
import { changeCredentials, changePassword, changeUsername } from '../reducers/userCredentialReducer'
import blogService from '../services/blogs'

const LoginForm = ({ showNotice })  => {
  const dispatch = useDispatch()
  const credentials = useSelector(state => state.credentials)

  const handleLogin = async (event) =>  {
    event.preventDefault()

    let loggedInUser
    try {
      loggedInUser = await dispatch(logUserIn(
        credentials.username, credentials.password
      ))
    } catch (e) {
      showNotice('Wrong username or password', 'error')
    }
    if (loggedInUser) {
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(loggedInUser)
      )
      blogService.setToken(loggedInUser.token)
      dispatch(changeCredentials())
    }
  }

  return (
    <div>
      <h4>To post blogs please log in</h4>
      <form onSubmit={handleLogin}>
        <div className="logging-in-fields">
          <span className="logging-in-text">Username</span>
          <input
            id="username"
            type="text"
            value={credentials.username}
            name="Username"
            onChange={(value) => dispatch(changeUsername(value))}
          />
        </div>
        <div className="logging-in-fields">
          <span className="logging-in-text">Password</span>
          <input
            id="password"
            type="password"
            value={credentials.password}
            name="Password"
            onChange={(value) => dispatch(changePassword(value))}
          />
        </div>
        <button id="login-button" type="submit" className="log-in-button">Log in</button>
      </form>
    </div>
  )
}

export default LoginForm