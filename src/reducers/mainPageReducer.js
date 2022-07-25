import { SET_USERS } from '../constants/actionTypes.js'

const INIT_STATE = {
    users: [],
}

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case SET_USERS: {
            return {
                ...state,
                users: action.payload,
            }
        }

        default:
            return state
    }
}
