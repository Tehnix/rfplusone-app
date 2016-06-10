import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import store from './src/stores/Store'
import FBLogin from './src/components/FBLogin'

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

class PlusOne extends Component {

  render() {
    return (
      <Provider store={store}>
        <FBLogin/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('PlusOne', () => PlusOne)
