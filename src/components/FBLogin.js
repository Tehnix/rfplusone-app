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
  setFBName
} from '../actions/FBLogin'

const FBSDK = require('react-native-fbsdk')
const {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK

class FBLogin extends Component {

  render() {
    const { store } = this.context;
    let welcomeText = (<Text></Text>)
    if (this.props.facebookName) {
      welcomeText = (<Text>
        Welcome {this.props.facebookName}!
      </Text>)
    }
    return (
      <View style={styles.loginContainer}>
        <Text style={styles.welcome}>
          Welcome to React Native!
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
                      function(error: ?Object, result: ?Object) {
                        if (error) {
                          // Handle the error...
                        } else {
                          store.dispatch(setFBName(result.name))
                        }
                      },
                    )).start()
                  }
                )
              }
            }
          }
          onLogoutFinished={() => store.dispatch(successfulFBLogout())} />
        {welcomeText}
      </View>
    )
  }
}
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
})

module.exports = connect(mapStateToProps)(FBLogin)
