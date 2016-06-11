import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

import FBLogin from './FBLogin'
import { FB_LOGIN_STATE } from '../actions/FBLogin'


class MainLayout extends Component {

  render() {
    const { store } = this.context;
    let welcomeText = <Text/>
    if (this.props.facebookName) {
      welcomeText = (
        <Text>
          Welcome {this.props.facebookName}!
        </Text>
      )
    }
    let currentStyle
    let initialScreen
    if (this.props.loginState == FB_LOGIN_STATE.LOGGED_IN) {
      currentStyle = styles.mainContainer
      initialScreen = (
        <View>
          <Text style={styles.welcome}>
            A list of concerts!
          </Text>
          <View style={styles.loginButton}>
            <FBLogin/>
          </View>
        </View>
      )
    } else {
      currentStyle = styles.loginContainer
      initialScreen = (
        <Image
            source={require('../images/loginBackground.png')}
            style={styles.loginImage}>
          <StatusBar
            background color="black"
            barStyle="light-content"/>
          <FBLogin/>
        </Image>
      )
    }
    return (
      <View style={currentStyle}>
        {initialScreen}
      </View>
    )
  }
}

MainLayout.contextTypes = {
  store: React.PropTypes.object.isRequired
}

MainLayout.propTypes = {
  accessToken: React.PropTypes.string.isRequired,
  loginState: React.PropTypes.string.isRequired,
  facebookName: React.PropTypes.string.isRequired,
  facebookUUID: React.PropTypes.string.isRequired
}

const mapStateToProps = function(state) {
  return {
    accessToken: state.login.accessToken,
    loginState: state.login.loginState,
    facebookName: state.login.facebookName,
    facebookUUID: state.login.facebookUUID
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  loginButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loginContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  loginImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: null,
    height: null,
  },
})

module.exports = connect(mapStateToProps)(MainLayout)
