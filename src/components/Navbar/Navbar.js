import { Link } from 'react-router-dom'
import './style.css'

const Navbar = () => {
    return (
        <nav>
            <Link className="nav-link" to="/login">
                Вход
            </Link>
            <Link className="nav-link" to="/">
                Главная
            </Link>

            <Link className="nav-link" to="/users">
                Пользователи
            </Link>

            <Link className="nav-link" to="/profile">
                Профиль
            </Link>
        </nav>
    )
}

export default Navbar
