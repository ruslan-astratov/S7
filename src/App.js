import { Routes, Route } from 'react-router-dom'

import MainPage from './pages/MainPage/MainPage'
import UsersPage from './pages/UsersPage/UsersPage'
import SelectedUserPage from './pages/SelectedUserPage/SelectedUserPage'
import LoginPage from './pages/LoginPage/LoginPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

import Navbar from './components/Navbar/Navbar'

const App = () => {
    return (
        <div>
            <Navbar />
            <br></br>
            <br></br>
            <Routes>
                <Route path="/" element={<MainPage />} />

                <Route path="/login" element={<LoginPage />} />
                <Route path="/users" element={<UsersPage />} />
                <Route path="/users/:id" element={<SelectedUserPage />} />
                <Route path="/profile" element={<ProfilePage />} />

                <Route path="/not-found-page" element={<NotFoundPage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <br></br>
            <br></br>
            <Navbar />
        </div>
    )
}

export default App
