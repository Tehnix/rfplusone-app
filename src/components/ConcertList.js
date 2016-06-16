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

import {
  showChatActivity,
  hideChatActivity,
  setChatUnreadCount
} from '../actions/Chats'

import MainLayout from './MainLayout'
import FBLoginButton from './FBLoginButton'

class ConcertList extends Component {
  render() {
    const { store } = this.context
    const concerts = this.props.concerts
    return (
      <MainLayout>
        <View>
          <Text style={styles.welcome}>
            A list of concerts!
          </Text>
          {Object.keys(concerts).map(function(key) {
            const concert = concerts[key]
            return (
              <Text key={concert.key}
                    onPress={() => Actions.concertView({title: concert.artist, concert: concert})}>
                Go see {concert.artist} on {concert.day}, {concert.time} at {concert.location}
              </Text>
            )
          })}
          <Text onPress={() => this.props.showChatActivity()}>
            Show chat activity!
          </Text>
          <Text onPress={() => this.props.hideChatActivity()}>
            Hide chat activity!
          </Text>
          <Text onPress={() => this.props.setChatUnreadCount(0)}>
            Set chat unread count to 0
          </Text>
          <Text onPress={() => this.props.setChatUnreadCount(15)}>
            Set chat unread count to 15
          </Text>
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
  concerts: React.PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    concerts: state.concerts.concerts,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    showChatActivity: () => {
      dispatch(showChatActivity())
    },
    hideChatActivity: () => {
      dispatch(hideChatActivity())
    },
    setChatUnreadCount: (count) => {
      dispatch(setChatUnreadCount(count))
    },
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConcertList)

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
