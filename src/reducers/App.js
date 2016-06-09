import { combineReducers } from 'redux'
import { FBLogin } from './FBLogin'


const plusOneApp = combineReducers({
  login: FBLogin
})

export default plusOneApp
