import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch, Route
} from 'react-router-dom'
import Blog from './components/Blog'
import blogService from './services/blogs'
import './App.css'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { setNotification } from './reducers/notificationReducer'
import { initBlogs } from './reducers/blogsReducer'
import { initUser, logUserOut, logUserIn } from './reducers/userReducer'
import { changeCredentials, changePassword, changeUsername } from './reducers/userCredentialReducer'
import Users from './components/Users'
import UserView from './components/UserView'
import BlogView from './components/BlogView'
import { Table, Navbar, Button, Modal, Form, Image } from 'react-bootstrap'

const App = () => {
  const [show, setShow] = useState(false)
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const credentials = useSelector(state => state.credentials)

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

  const logInButton = () => {
    return (
      <>
        <Button variant="secondary" onClick={() => setShow(true)}>Log in
        </Button>

        <Modal show={show} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Please log in</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={credentials.username}
                onChange={(value) => dispatch(changeUsername(value))}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={credentials.password}
                onChange={(value) => dispatch(changePassword(value))}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
            </Button>
            <Button variant="primary"   onClick={(event) => handleLogin(event)}>
            Log in
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }


  const blogForm = () => {
    return (
      <div>
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
        <Image src={require('./see-picture.jpg')} fluid />
        <Navbar bg="light">
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Brand href="/users">Users</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>{user !== null ? loggedIn() : logInButton()}</Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
        <Notification />
        {user !== null ? blogForm()
          : null}
      </div>
    )
  }

  const loggedIn = () => {
    return (
      <div>{user.name} logged in <button onClick={handleLogout}>Log out</button> </div>
    )
  }

  return (
    <div className="container">
      <Router>
        {header()}
        <Switch>
          <Route path="/users/:id">
            <UserView  />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <BlogView user={user} showNotice={showNotice}/>
          </Route>
          <Route path="/">
            <h2>Blogs</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Blog Title</th>
                  <th>Author</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog, index) =>
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>
                      <Blog key={blog.id} blog={blog} /></td>
                    <td>{blog.author}</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App