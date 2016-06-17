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

class ChatList extends Component {
  render() {
    const { store } = this.context
    return (
      <MainLayout>
        <View>
          <Text style={styles.welcome}>
            A list of chats!
          </Text>
          {this.props.chats.map(function(chat) {
            return (
              <Text key={chat.key}
                    onPress={() => Actions.chatView({chat: chat})}>
                Chat {chat.key} for concert {chat.concert.artist}
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
        </View>
      </MainLayout>
    )
  }
}

ChatList.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ChatList.propTypes = {
  routes: React.PropTypes.object,
  chats: React.PropTypes.array.isRequired
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    chats: state.chats.chats
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(ChatList)

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
