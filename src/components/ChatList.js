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

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

module.exports = connect(mapStateToProps)(ChatList)
