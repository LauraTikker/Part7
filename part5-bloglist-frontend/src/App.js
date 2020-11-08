import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './App.css'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'
import { initUser, logUserOut } from './reducers/userReducer'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogView from './components/BlogView'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() =>  {
    dispatch(initBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      const initiallUser = {
        name: loggedUser.name,
        username: loggedUser.username,
        token: loggedUser.token
      }
      blogService.setToken(loggedUser.token)
      dispatch(initUser(initiallUser))
    }
  }, [dispatch])

  const blogFormRef = React.createRef()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedNoteappUser')
    dispatch(logUserOut())
  }

  const showNotice = (message, type) => {
    notification.timeOutIds.forEach(timeOutId => clearTimeout(timeOutId))
    dispatch(setNotification(message, type))
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='Log in'>
        <LoginForm showNotice={showNotice} />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <div>
        <div>
          <Link className="links" to="/">Home</Link>
          <Link className="links" to="/users">Blogs</Link>
        </div>
        <div className="logged-in-user">{user.name}  logged in <button className="log-out-button" onClick={handleLogout}>Log out</button></div>
        <Togglable buttonLabel='Create new post' ref={blogFormRef}>
          <BlogForm
            showNotice={showNotice} blogFormRef={blogFormRef}
          />
        </Togglable>
      </div>
    )
  }

  const header = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        {user === null ? loginForm()
          : blogForm()}
      </div>
    )
  }

  return (
    <Router>
      <Switch>
        <Route path="/users/:id">
          {header()}
          <UserView  />
        </Route>
        <Route path="/users">
          {header()}
          <Users />
        </Route>
        <Route path="/blogs/:id">
          {header()}
          <BlogView user={user} showNotice={showNotice}/>
        </Route>
        <Route path="/">
          {header()}
          <h2>Blogs</h2>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default App