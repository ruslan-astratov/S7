import { Navigate } from 'react-router-dom'

const ProfilePage = () => {
    const token = localStorage.getItem('token')
    if (!token) return <Navigate replace to="/login" />

    return <div>Профиль. Приватная страница, доступная при наличии токена</div>
}
export default ProfilePage
