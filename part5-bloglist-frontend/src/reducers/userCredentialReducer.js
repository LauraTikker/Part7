
const initialData = {
  username: '',
  password: ''
}

export const changePassword = (event) => {
  return {
    type: 'PASSWORD',
    data: {
      password: event.target.value
    }
  }
}

export const changeUsername = (event) => {
  return {
    type: 'USERNAME',
    data: {
      username: event.target.value
    }
  }
}

export const changeCredentials = () => {
  return {
    type: 'BOTH',
  }
}

const userCredentialReducer = (state = initialData, action) => {
  switch(action.type) {
  case 'PASSWORD':
    return {
      password: action.data.password,
      username: state.username
    }
  case 'USERNAME':
    return {
      password: state.password,
      username: action.data.username
    }
  case 'BOTH':
    return initialData
  default:
    return state
  }
}

export default userCredentialReducer