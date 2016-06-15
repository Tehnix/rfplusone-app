import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

import Login from './Login'
import ConcertList from './ConcertList'
import { FB_LOGIN_STATE } from '../actions/FBLogin'


class Launch extends Component {
  render() {
    const { store } = this.context
    let initialView
    if (this.props.loginState == FB_LOGIN_STATE.LOGGED_IN) {
      initialView = <ConcertList/>
    } else {
      initialView = <Login/>
    }
    return (
      <View style={styles.container}>
        {initialView}
      </View>
    )
  }
}

Launch.contextTypes = {
  store: React.PropTypes.object.isRequired
}

Launch.propTypes = {
  routes: React.PropTypes.object,
  loginState: React.PropTypes.string.isRequired
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    loginState: state.login.loginState
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

module.exports = connect(mapStateToProps)(Launch)
