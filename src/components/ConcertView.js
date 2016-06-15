import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

class ConcertView extends Component {
  static propTypes = {
    routes: PropTypes.object,
  }

  render() {
    const { store } = this.context
    return (
      <View style={styles.currentStyle}>
        <Text style={styles.welcome}>
          Some kind of cool artist
        </Text>
        <Text>
          Playing a cool concert!
        </Text>
      </View>
    )
  }
}

ConcertView.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ConcertView.propTypes = {
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
    marginTop: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

module.exports = connect(mapStateToProps)(ConcertView)
