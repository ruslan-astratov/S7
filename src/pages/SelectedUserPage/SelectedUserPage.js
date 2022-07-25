// import { useEffect } from 'react'
// import { fetchUsers } from '../../api/api'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { useParams, Navigate } from 'react-router-dom'

import './style.css'

const SelectedUserPage = ({ users }) => {
    const params = useParams()
    console.log('params.id', params.id)

    console.log('users', users)

    const findedUser = users.find((user) => user.id === Number(params.id))
    console.log('findedUser', findedUser)

    if (!findedUser) {
        return <Navigate replace to="/" />
    }

    return (
        <>
            <p> Информация о выбранном пользователе</p>
            <img
                src={findedUser.avatar}
                width="50"
                height="50"
                alt="Pic of the author"
                className="user-avatar"
            />
            <p>{findedUser.first_name}</p>
            <p>{findedUser.last_name}</p>
            <p>Электронная почта:</p>
            <p>{findedUser.email}</p>
        </>
    )
}

SelectedUserPage.propTypes = {
    users: PropTypes.array,
}

const mapStateToProps = ({ mainPageReducer }) => {
    const { users } = mainPageReducer

    return {
        users,
    }
}

export default connect(mapStateToProps, {})(SelectedUserPage)
