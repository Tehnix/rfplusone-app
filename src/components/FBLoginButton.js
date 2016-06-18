import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { ENDPOINTS } from '../stores/Constants'
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

  // Exchange the facebook access token with a session token
  _exchangeTokenToSession(store, Actions, accessToken) {
    fetch(ENDPOINTS.exchangeTokenToSession)
    .then((response) => response.json())
    .then((responseData) => {
      if (responseData.sessionToken) {
        store.dispatch(successfulFBLogin(
          accessToken,
          responseData.sessionToken
        ))
        Actions.pop()
      }
    })
    .catch((error) => {
      store.dispatch(errorFBLogin())
    })
    .done()
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
          // Exchange the Facebook access token for a session token
          this._exchangeTokenToSession(
            store,
            Actions,
            data.accessToken.toString()
          )
        }
      )
    }
  }

  // Handle a logout and wipe the session/accesstoken/facebook info
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

module.exports = connect()(FBLoginButton)

const styles = StyleSheet.create({
  loginButton: {
    height: 55,
    width: 220
  },
})
