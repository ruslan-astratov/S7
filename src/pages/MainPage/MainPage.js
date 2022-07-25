import PropTypes from 'prop-types'

import 'react-toastify/dist/ReactToastify.css'
import './style.css'

const MainPage = () => {
    return <div className="main-page">Главная страница</div>
}

MainPage.propTypes = {
    setUsersAction: PropTypes.func,
}

export default MainPage
