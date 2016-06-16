import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import {
  successfulFBLogin,
  unsuccessfulFBLogin,
  cancelledFBLogin,
  errorFBLogin,
  successfulFBLogout,
  setFacebookUserInformation
} from '../actions/FBLogin'

const FBSDK = require('react-native-fbsdk')
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK

class FBLoginButton extends Component {
  // Fetch the users name and ID via the Graph API
  _fetchFBProfile(store) {
    new GraphRequestManager().addRequest(new GraphRequest(
      '/me',
      {
        parameters: {
          fields: {
            string: 'email,name,first_name,middle_name,last_name'
          }
        }
      },
      function(error: ?Object, result: ?Object) {
        if (error) {
          // Handle the error...
        } else {
          store.dispatch(setFacebookUserInformation(
            result.id,
            result.name,
            result.first_name,
            result.middle_name,
            result.last_name,
            result.email
          ))
        }
      },
    )).start()
  }

  // Handle the login result, and store the access token if successful
  _handleLogin(store, Actions, error, result) {
    if (error) {
      store.dispatch(errorFBLogin())
    } else if (result.isCancelled) {
      store.dispatch(cancelledFBLogin())
    } else {
      AccessToken.getCurrentAccessToken().then(
        (data) => {
          // Fetch the users facebook name
          this._fetchFBProfile(store)
          store.dispatch(successfulFBLogin(data.accessToken.toString()))
          Actions.pop()
        }
      )
    }
  }

  _handleLogout(store, Actions) {
    store.dispatch(successfulFBLogout())
  }

  render() {
    const { store } = this.context
    return (
      <LoginButton
        style={styles.loginButton}
        readPermissions={['public_profile', 'user_friends', 'email']}
        onLoginFinished={(e, res) => this._handleLogin(store, Actions, e, res)}
        onLogoutFinished={() => this._handleLogout(store, Actions)}/>
    )
  }
}

FBLoginButton.contextTypes = {
  store: React.PropTypes.object.isRequired
}

const styles = StyleSheet.create({
  loginButton: {
    height: 55,
    width: 220
  },
})

module.exports = connect()(FBLoginButton)
