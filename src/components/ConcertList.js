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

import MainLayout from './MainLayout'
import FBLoginButton from './FBLoginButton'

class ConcertList extends Component {
  render() {
    const { store } = this.context
    return (
      <MainLayout>
        <View>
          <Text style={styles.welcome}>
            A list of concerts!
          </Text>
          {this.props.concerts.map(function(concert) {
            return (
              <Text key={concert.key}
                    onPress={() => Actions.concertView({title: concert.artist, concert: concert})}>
                Go see {concert.artist} on {concert.day}, {concert.time} at {concert.location}
              </Text>
            )
          })}
          <FBLoginButton/>
        </View>
      </MainLayout>
    )
  }
}

ConcertList.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ConcertList.propTypes = {
  routes: React.PropTypes.object,
  concerts: React.PropTypes.array.isRequired
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    concerts: state.concerts.concerts
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

module.exports = connect(mapStateToProps)(ConcertList)
