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
        case 'REMOVE_REC':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    recipies: action.recipie
                }
            }
        break;
        case 'ADD_LIKE':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    likes: action.like
                }
            }
        break;
        case 'REMOVE_LIKE':
            return {
                ...currentState,
                user: {
                    ...currentState.user,
                    likes: action.like
                }
            }
        break;
        case 'SET_CATEGORY':
            return {
                ...currentState,
                category: action.category
            }
        break;
        case 'UNSET_CATEGORY':
            return {
                ...currentState,
                category: undefined
            }
        break;
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
        break;
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
