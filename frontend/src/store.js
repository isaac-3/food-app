import { createStore } from 'redux'
import {persistStore} from 'redux-persist'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const noUserState = {
    user: {id: undefined}
}

const initialState = {
    user: {id: undefined}
}

const reducer = (currentState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                ...currentState,
                user: action.user
            }
        break;
        case 'LOG_OUT':
            return {
                ...currentState,
                user: noUserState.user
            }
        break;
        case 'ADD_REC':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    recipies: action.recipie
                }
            }
        break;
    }
    return currentState
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']

}

const persistR = persistReducer(persistConfig, reducer)

export const store = createStore(persistR, initialState)
export const persistor = persistStore(store)
