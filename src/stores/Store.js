import { createStore } from 'redux'
import plusOneApp from '../reducers/App'

let store = createStore(plusOneApp)

export default store
