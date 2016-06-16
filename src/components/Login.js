import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'
import { Scene, Router, Actions} from 'react-native-router-flux'

import FBLoginButton from './FBLoginButton'
import { FB_LOGIN_STATE } from '../actions/FBLogin'


class Login extends Component {
  render() {
    const { store } = this.context
    return (
      <Image
          source={require('../../graphics/loginBackground.png')}
          style={styles.loginImage}>
        <StatusBar
          background color="black"
          barStyle="light-content"/>
        <FBLoginButton/>
      </Image>
    )
  }
}

Login.contextTypes = {
  store: React.PropTypes.object.isRequired
}

Login.propTypes = {
  routes: React.PropTypes.object,
  loginState: React.PropTypes.string.isRequired
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    loginState: state.login.loginState
  }
}

module.exports = connect(mapStateToProps)(Login)

const styles = StyleSheet.create({
  loginImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
})
