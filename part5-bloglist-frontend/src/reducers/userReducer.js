import loginService from '../services/login'

export const logUserIn = (username, password) => {

  return async dispath => {
    const credentials = {
      username: username,
      password: password
    }

    const loggedInUser = await loginService.login(credentials)
    if (loggedInUser) {
      dispath({
        type: 'LOGIN',
        data: {
          username: loggedInUser.username,
          name: loggedInUser.name,
          token: loggedInUser.token
        }
      })
    }
    return loggedInUser
  }
}

export const initUser = (user) => {
  return {
    type: 'LOGIN',
    data: {
      username: user.username,
      name: user.name,
      token: user.token
    }
  }
}

export const logUserOut = () => {
  return {
    type: 'LOGOUT'
  }
}

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'LOGIN':
    return {
      username: action.data.username,
      name: action.data.name,
      token: action.data.token
    }
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export default userReducer