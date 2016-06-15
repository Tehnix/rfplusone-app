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

import FBLoginButton from './FBLoginButton'

class ConcertList extends Component {
  render() {
    const { store } = this.context
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.welcome}>
          A list of concerts!
        </Text>
        <Text onPress={() => Actions.concertView({title: 'Awesome Concert'})}>
          Go to a concert!
        </Text>
        <FBLoginButton/>
      </View>
    )
  }
}

ConcertList.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ConcertList.propTypes = {
  routes: React.PropTypes.object,
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

module.exports = connect(mapStateToProps)(ConcertList)
