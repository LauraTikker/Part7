import userService from '../services/login'

export const initUsers = () => {

  return async dispath => {
    const allUsers = await userService.users()
    if (allUsers) {
      dispath({
        type: 'INIT',
        data: allUsers
      })
    }
    return allUsers
  }
}

const usersReducer = (state = [], action) => {
  switch(action.type) {
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export default usersReducer