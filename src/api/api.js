import http from '../utils/axiosHttpConfig'

export const fetchUsers = () => http.get('/users')
export const submitBlank = (payload) => http.post('/login', payload)
