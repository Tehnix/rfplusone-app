import React, { PropTypes, Component } from 'react'
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
  setFBNameAndUUID
} from '../actions/FBLogin'

const FBSDK = require('react-native-fbsdk')
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK

class FBLogin extends Component {

  // Fetch the users name and ID via the Graph API
  _fetchFBProfile(store) {
    new GraphRequestManager().addRequest(new GraphRequest(
      '/me',
      null,
      function(error: ?Object, result: ?Object) {
        if (error) {
          // Handle the error...
        } else {
          store.dispatch(setFBNameAndUUID(result.name, result.id))
        }
      },
    )).start()
  }

  // Handle the login result, and store the access token if successful
  _handleLogin(store, error, result) {
    if (error) {
      store.dispatch(errorFBLogin())
    } else if (result.isCancelled) {
      store.dispatch(cancelledFBLogin())
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          store.dispatch(successfulFBLogin(data.accessToken.toString()))
          // Fetch the users facebook name
          this._fetchFBProfile(store)
        }
      )
    }
  }

  render() {
    const { store } = this.context;
    return (
      <LoginButton
        style={styles.loginButton}
        readPermissions={["public_profile", "user_friends", "email"]}
        onLoginFinished={(e, res) => this._handleLogin(store, e, res)}
        onLogoutFinished={() => store.dispatch(successfulFBLogout())}/>
    )
  }
}

FBLogin.contextTypes = {
  store: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  loginButton: {
    height: 55,
    width: 220
  },
})

module.exports = connect()(FBLogin)
