import { createStore, combineReducers } from 'redux'
import * as reducers from '../reducers'

const plusOneAppReducers = combineReducers(reducers)

export default createStore(plusOneAppReducers);
