import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar
} from 'react-native'
import { connect } from 'react-redux'

import MainLayout from './MainLayout'

class ConcertView extends Component {

  render() {
    const { store } = this.context
    return (
      <MainLayout>
        <View>
          <Text style={styles.welcome}>
            {this.props.concert.artist}
          </Text>
          <Text>
            Playing on {this.props.concert.day}, {this.props.concert.time} at {this.props.concert.location}!
          </Text>
        </View>
      </MainLayout>
    )
  }
}

ConcertView.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ConcertView.propTypes = {
  routes: React.PropTypes.object,
  concert: React.PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

module.exports = connect(mapStateToProps)(ConcertView)
