import React, { PropTypes } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import {
  successfulFBLogin,
  unsuccessfulFBLogin,
  cancelledFBLogin,
  errorFBLogin,
  successfulFBLogout,
  setFBName
} from '../actions/FBLogin'

const FBSDK = require('react-native-fbsdk')
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK

var FBLogin = React.createClass({

  getInitialState: function() {
    return {
      fbLoginState: '',
      fbLoginError: '',
      fbIsLoggedIn: false,
      fbAccessToken: ''
    }
  },

  _responseInfoCallback: function(error: ?Object, result: ?Object) {
    const { store } = this.context;
    if (error) {
      // Handle the error...
    } else {
      store.dispatch(setFBName(result.name))
    }
  },

  render: function() {
    const { store } = this.context;
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        <Text style={styles.instructions}>
          Press Cmd+R to reload,{'\n'}
          Cmd+D or shake for dev menu
        </Text>
        <LoginButton
          readPermissions={["public_profile", "user_friends", "email"]}
          onLoginFinished={
            (error, result) => {
              if (error) {
                store.dispatch(errorFBLogin())
              } else if (result.isCancelled) {
                store.dispatch(cancelledFBLogin())
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    store.dispatch(successfulFBLogin(data.accessToken.toString()))
                    // Fetch the users facebook name
                    new GraphRequestManager().addRequest(new GraphRequest(
                      '/me',
                      null,
                      this._responseInfoCallback,
                    )).start()
                  }
                )
              }
            }
          }
          onLogoutFinished={() => store.dispatch(successfulFBLogout())} />
        <Text>
          Welcome {this.props.facebookName}!
        </Text>
      </View>
    )
  }
})
FBLogin.contextTypes = {
  store: React.PropTypes.object
}
FBLogin.propTypes = {
  facebookName: React.PropTypes.string
}

const mapStateToProps = function(state) {
  return {
    facebookName: state.login.facebookName
  }
}

const FBLoginContainer = connect(mapStateToProps)(FBLogin)

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  }
})

module.exports = FBLogin, FBLoginContainer
