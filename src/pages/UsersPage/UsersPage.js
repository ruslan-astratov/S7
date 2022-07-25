import { useState, useEffect } from 'react'
import { fetchUsers } from '../../api/api'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setUsers } from '../../actions/mainPageActions'
import { Link } from 'react-router-dom'

import './style.css'
import '../../index.css'

const UsersPage = ({ users, setUsersAction }) => {
    const [typeSearch, settypeSearch] = useState(
        localStorage.getItem('typeSearch') || 'имени'
    )
    const [searchQuery, setSearchQuery] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const [newUserName, setnewUserName] = useState('')
    const [newUserSurname, setNewUserSurname] = useState('')
    const [newUserEmail, setNewUserEmail] = useState('')

    useEffect(() => {
        fetchUsers().then((data) => {
            setUsersAction(data.data.data)
        })
    }, [setUsersAction])

    useEffect(() => {
        if (!searchQuery) {
            setSearchResults(users)
        } else {
            const field =
                typeSearch === 'имени'
                    ? 'first_name'
                    : typeSearch === 'фамилии'
                    ? 'last_name'
                    : 'email'

            const filteredUsers = users.filter((v) =>
                v[field].toLowerCase().includes(searchQuery)
            )
            setSearchResults(filteredUsers)
        }
    }, [searchQuery, users, typeSearch])

    const handleChange = (e) => {
        settypeSearch(e.target.value)
        localStorage.setItem('typeSearch', e.target.value)
    }

    const handleDeleteUser = (id) => {
        const filteredUsers = users.filter((v) => v.id !== id)
        setUsersAction(filteredUsers)
    }

    const handleClickAddUser = () => {
        const usersIDs = users.map((v) => v.id)
        const newUserUniqId = Math.max.apply(null, usersIDs) + 1

        const newUser = {
            id: newUserUniqId,
            email: newUserEmail,
            first_name: newUserName,
            last_name: newUserSurname,
            avatar: '',
        }

        const newUsers = users.concat(newUser)
        setUsersAction(newUsers)

        setnewUserName('')
        setNewUserSurname('')
        setNewUserEmail('')
    }

    return (
        <div>
            <div className="users">
                {users.length > 0 && (
                    <div className="users-search">
                        <p>Поиск по {typeSearch}</p>
                        <input
                            className="mb-10"
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        ></input>
                        <div className="radio-button-group mb-20">
                            <input
                                type="radio"
                                value="имени"
                                id="name"
                                onChange={handleChange}
                                name="typeSearch"
                                defaultChecked={
                                    localStorage.getItem('typeSearch') ===
                                    'имени'
                                }
                            />
                            <label htmlFor="name">имени</label>

                            <input
                                type="radio"
                                value="фамилии"
                                id="surname"
                                onChange={handleChange}
                                name="typeSearch"
                                defaultChecked={
                                    localStorage.getItem('typeSearch') ===
                                    'фамилии'
                                }
                            />
                            <label htmlFor="surname">фамилии</label>

                            <input
                                type="radio"
                                value="электронной почте"
                                id="email"
                                onChange={handleChange}
                                name="typeSearch"
                                defaultChecked={
                                    localStorage.getItem('typeSearch') ===
                                    'электронной почте'
                                }
                            />
                            <label htmlFor="email">электронной почте</label>
                        </div>
                    </div>
                )}

                <div className="users-add mb-20">
                    <p>Добавить пользователя</p>
                    <span>Имя</span>
                    <input
                        value={newUserName}
                        onChange={(e) => setnewUserName(e.target.value)}
                    />
                    <span>Фамилия</span>
                    <input
                        value={newUserSurname}
                        onChange={(e) => setNewUserSurname(e.target.value)}
                    />
                    <span>Электронная почта</span>
                    <input
                        value={newUserEmail}
                        onChange={(e) => setNewUserEmail(e.target.value)}
                    />
                    <button
                        disabled={
                            !newUserName || !newUserSurname || !newUserEmail
                        }
                        onClick={handleClickAddUser}
                    >
                        Добавить
                    </button>
                </div>

                {users.length > 0 &&
                    searchResults.map((user) => {
                        return (
                            <Link
                                key={user.id}
                                className="link-to-user"
                                to={`/users/${user.id}`}
                            >
                                <img
                                    src={
                                        user.avatar ||
                                        'http://via.placeholder.com/640x360'
                                    }
                                    width="50"
                                    height="50"
                                    alt="Pic of the author"
                                    className="user-avatar mr-20"
                                />
                                <div className="user-data">
                                    <p>{user.first_name}</p>
                                    <p>{user.last_name}</p>

                                    <p>Электронная почта:</p>
                                    <p>{user.email}</p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault()
                                        handleDeleteUser(user.id)
                                    }}
                                >
                                    Удалить
                                </button>
                            </Link>
                        )
                    })}
            </div>
        </div>
    )
}

UsersPage.propTypes = {
    users: PropTypes.array,
    setUsersAction: PropTypes.func,
}

const mapStateToProps = ({ mainPageReducer }) => {
    const { users } = mainPageReducer

    return {
        users,
    }
}

export default connect(mapStateToProps, { setUsersAction: setUsers })(UsersPage)
