import { SET_USERS } from '../constants/actionTypes'

export const setUsers = (users) => {
    return {
        type: SET_USERS,
        payload: users,
    }
}
