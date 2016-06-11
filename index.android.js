import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'

import store from './src/stores/Store'
import MainLayout from './src/components/MainLayout'

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

class PlusOne extends Component {

  render() {
    return (
      <Provider store={store}>
        <MainLayout/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('PlusOne', () => PlusOne)
