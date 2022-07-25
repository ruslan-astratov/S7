import { configureStore } from '@reduxjs/toolkit'
import mainPageReducer from './reducers/mainPageReducer'

import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

export default configureStore(
    {
        reducer: {
            mainPageReducer: mainPageReducer,
        },
    },
    applyMiddleware(thunk)
)
