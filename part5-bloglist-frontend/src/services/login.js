import axios from 'axios'
const baseUrl = '/api'

const login = async credentials => {
  const response = await axios.post(baseUrl + '/login', credentials)
  return response.data
}

const users = async () => {
  const response = await axios.get(baseUrl + '/users')
  return response.data
}

export default { login, users }