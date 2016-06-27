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
    let failedLoginNotification
    let inProgressNotification
    if (this.props.loginState == FB_LOGIN_STATE.LOGIN_ERROR) {
      failedLoginNotification = (
        <Text style={styles.failedLogin}>
          Seems the login failed on our end :( Try and log out from facebook and back in again
        </Text>
      )
    }
    if (this.props.loginState == FB_LOGIN_STATE.LOGIN_IN_PROGRESS) {
      inProgressNotification = (
        <Text  style={styles.inProgress}>
          Setting up your account in our backend...
        </Text>
      )
    }
    return (
      <Image
          source={require('../../graphics/loginBackground.png')}
          style={styles.loginImage}>
        <StatusBar
          background color="black"
          barStyle="light-content"/>
        <FBLoginButton/>
        <View style={styles.notificationContainer}>
          {inProgressNotification}
          {failedLoginNotification}
        </View>
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
  notificationContainer: {
    height: 150,
    marginBottom: -150,
    backgroundColor: 'transparent',
  },
  failedLogin: {
    backgroundColor: '#F6DDDD',
    borderColor: '#F2C9D0',
    color: '#B83538',
    textAlign: 'center',
    textAlignVertical: 'center',
    borderWidth: 1,
    margin: 10,
    marginTop: 20,
    padding: 7,
  },
  inProgress: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    color: 'orange',
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
    marginTop: 20,
    padding: 10,
  },
})
