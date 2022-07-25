import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { submitBlank } from '../../api/api'
import { fetchErrorHandler } from '../../utils/fetchErrorHandler'
import { ToastContainer } from 'react-toastify'
import './style.css'

const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setpassword] = useState('')
    const [fetching, setFetching] = useState(false)
    let navigate = useNavigate()

    const handleSubmit = () => {
        setFetching(true)
        submitBlank({
            // email: 'george.bluth@reqres.in',
            // password: 'cerulean',
            email: login,
            password,
        })
            .then((res) => {
                console.log('Ответ на логин запрос', res)
                const token = res?.data?.token
                if (token) {
                    localStorage.setItem('token', token)
                    navigate('/profile')
                }
            })
            .catch((error) => {
                console.log('Ответ на login-запрос', error.message)
                fetchErrorHandler(error.message)
            })
            .finally(() => setFetching(false))
    }

    return (
        <>
            <form className="login-form" onSubmit={(e) => e.preventDefault()}>
                <h1>Форма входа</h1>

                <p>Введите логин</p>
                <input
                    value={login}
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                    className="mb-20"
                />

                <p>Введите пароль</p>
                <input
                    value={password}
                    type="password"
                    onChange={(e) => setpassword(e.target.value)}
                    className="mb-20"
                />

                <button disabled={fetching} onClick={handleSubmit}>
                    Войти
                </button>
            </form>
            <ToastContainer />
        </>
    )
}

export default LoginPage
