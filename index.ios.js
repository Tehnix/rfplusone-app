import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Provider, connect } from 'react-redux'

import store from './src/stores/Store'
import FBLogin from './src/components/FBLogin'

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

class PlusOne extends Component {

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FBLogin/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})

AppRegistry.registerComponent('PlusOne', () => PlusOne)
