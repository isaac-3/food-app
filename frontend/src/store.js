import { createStore } from 'redux'
import {persistStore} from 'redux-persist'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const noUserState = {
    user: {id: undefined}
}

const initialState = {
    user: {id: undefined},
    category: undefined
}

const reducer = (currentState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                ...currentState,
                user: action.user
            }
        case 'LOG_OUT':
            return {
                ...currentState,
                user: noUserState.user
            }
        case 'ADD_REC':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    recipies: action.recipie
                }
            }
        case 'REMOVE_REC':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    recipies: action.recipie
                }
            }
        case 'ADD_LIKE':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    likes: action.like
                }
            }
        case 'REMOVE_LIKE':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    likes: action.like
                }
            }
        case 'SET_CATEGORY':
            return {
                ...currentState,
                category: action.category
            }
        case 'UNSET_CATEGORY':
            return {
                ...currentState,
                category: undefined
            }
        case 'REMOVE_MEAL':
            const newSet = currentState.user.recipies.filter(rec => {
                return rec.id !== action.meal
            })
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    recipies: newSet
                }
            }
    }
    return currentState
}

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user', 'category']

}

const persistR = persistReducer(persistConfig, reducer)

export const store = createStore(persistR, initialState)
export const persistor = persistStore(store)
