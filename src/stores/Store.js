import { createStore, combineReducers } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import * as reducers from '../reducers'

const plusOneAppReducers = combineReducers(reducers)

const store = createStore(plusOneAppReducers, undefined, autoRehydrate())
persistStore(store, {storage: AsyncStorage})

export default store
