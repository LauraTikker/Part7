
let timeOutId

const initialState = {
  message: '',
  timeOutIds: [],
  type: ''
}

const clearTimeoutArray = () => {
  return {
    type: 'CLEAR',
  }
}

export const showNotification = (message, timeOutId, type) => {
  return {
    type: 'SHOW',
    data: {
      message: message,
      timeOutId: timeOutId,
      type: type
    }
  }
}

export const setNotification = (message, type) => {
  return async dispatch => {
    dispatch(clearTimeoutArray)
    timeOutId = setTimeout(() => {
      dispatch({
        type: 'HIDE'
      })
    }, 5000)
    dispatch(showNotification(message, timeOutId, type))
  }
}

const notificationReducer = (state = initialState, action) =>  {
  switch (action.type)  {
  case 'SHOW':
    return {
      message: action.data.message,
      timeOutIds: state.timeOutIds.concat(action.data.timeOutId),
      type: action.data.type
    }
  case 'HIDE':
    return {
      message: '',
      timeOutIds: [],
      type: ''
    }
  case 'CLEAR':
    return {
      message: '',
      timeOutIds: [],
      type: ''
    }
  default:
    return state
  }
}

export default notificationReducer