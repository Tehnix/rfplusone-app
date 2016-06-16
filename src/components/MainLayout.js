import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import { REHYDRATION_STATE } from '../actions/Persist'
import { FB_LOGIN_STATE } from '../actions/FBLogin'

class MainLayout extends Component {
  componentWillReceiveProps(nextProps) {
    const { store } = this.context
    // Wait for the state to be fully rehydrated before checking if we are
    // logged in, and if not redirecting the user to the login screen.
    if (nextProps.rehydrationState == REHYDRATION_STATE.FINSIHED_REHYDRATING &&
        !(nextProps.loginState == FB_LOGIN_STATE.LOGGED_IN) &&
        nextProps.routes.scene.sceneKey != 'login') {
      Actions.login()
    }
  }

  render() {
    return (
      <View style={styles.mainContainer}>
        {this.props.children}
      </View>
    )
  }
}

MainLayout.contextTypes = {
  store: React.PropTypes.object.isRequired
}

MainLayout.propTypes = {
  children: React.PropTypes.element.isRequired,
  routes: React.PropTypes.object,
  rehydrationState: React.PropTypes.string.isRequired,
  accessToken: React.PropTypes.string.isRequired,
  loginState: React.PropTypes.string.isRequired,
  facebookID: React.PropTypes.string.isRequired,
  facebookFullName: React.PropTypes.string.isRequired,
  facebookFirstName: React.PropTypes.string.isRequired,
  facebookMiddleName: React.PropTypes.string.isRequired,
  facebookLastName: React.PropTypes.string.isRequired,
  facebookEmail: React.PropTypes.string.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    rehydrationState: state.persist.rehydration,
    accessToken: state.login.accessToken,
    loginState: state.login.loginState,
    facebookID: state.login.facebookID,
    facebookFullName: state.login.facebookFullName,
    facebookFirstName: state.login.facebookFirstName,
    facebookMiddleName: state.login.facebookMiddleName,
    facebookLastName: state.login.facebookLastName,
    facebookEmail: state.login.facebookEmail,
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 60,
  },
})

module.exports = connect(mapStateToProps)(MainLayout)
