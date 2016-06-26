import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Button,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import {
  showChatActivity,
  hideChatActivity,
  setChatUnreadCount,
  setChatState,
} from '../actions/Chats'
import {
  getConcertFromId,
  weekdayFromDate,
  getHourMinutesFromDate,
} from '../Utility'

import MainLayout from './MainLayout'
import FBLoginButton from './FBLoginButton'

class ChatList extends Component {
  _concatenateParticipants(participants) {
    let names = []
    const arrayLength = participants.length
    for (let i = 0; i < arrayLength; i++) {
      const participant = participants[i]
      names.push(participant.name.split(' ')[0])
    }
    names = names.join(', ')
    if (names.length > 33) {
      return names.substring(0, 33) + '...'
    }
    return names
  }

  _initChatState(dispatch, chatState, chatId) {
    if (!chatState[chatId]) {
      const chatState = {
        messages: [],
        isLoadingEarlierMessages: false,
        typingMessage: '',
        allLoaded: true,
      }
      dispatch(setChatState(chatId, chatState))
    }
  }

  render() {
    const { store } = this.context
    const sessionToken = this.props.sessionToken
    const concerts = this.props.concerts
    const chatState = this.props.chatState
    const concatenateParticipants = this._concatenateParticipants
    const initChatState = this._initChatState
    return (
      <MainLayout>
        <View style={styles.container}>
          {this.props.chats.map(function(chat) {
            const concert = getConcertFromId(chat.concert_id, concerts)
            let chatName = 'Chat'
            let titleName = 'Chat'
            if (chat.participants && chat.participants.length == 1) {
              chatName = '+1 ' + chat.participants[0].name.split(' ')[0]
              titleName = chatName
            } else if (chat.participants && chat.participants.length > 1) {
              chatName = '+8 ' + concatenateParticipants(chat.participants)
              if (chatName.length > 30) {
                titleName = chatName.substring(0, 30) + '...'
              }
            }
            let chatTitleStyle = styles.chatTitle
            let chatDescriptionStyle = styles.chatDescription
            if (chat.unread_count > 0) {
              chatTitleStyle = styles.chatTitleUnread
              chatDescriptionStyle = styles.chatDescriptionUnread
            }
            return (
              <TouchableOpacity key={chat.id}
                                  style={styles.chatItemContainer}
                                  onPress={() => {
                                    initChatState(store.dispatch, chatState, chat.id, chat.participants, concert)
                                    Actions.chatView({title: titleName, chat: chat, concert: concert})
                                  }}>
                <View numberOfLines={1} style={styles.chatItemContainer}>
                  <Image style={styles.chatPicture}
                         source={{uri: concert.images[0].url}}/>
                  <View numberOfLines={1} style={styles.chatInformation}>
                    <Text numberOfLines={1} style={chatTitleStyle}>
                      {chatName}
                    </Text>
                    <Text numberOfLines={1} style={chatDescriptionStyle}>
                      Going to see {concert.artist}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          })}
          <View style={styles.loginContainer}>
            <FBLoginButton/>
          </View>
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
  chats: React.PropTypes.array.isRequired,
  chatState: React.PropTypes.object.isRequired,
  concerts: React.PropTypes.array.isRequired,
  sessionToken: React.PropTypes.string.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    chats: state.chats.chats,
    chatState: state.chats.chatState,
    concerts: state.concerts.concerts,
    sessionToken: state.login.sessionToken,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ChatList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  chatPicture: {
    height: 33,
    width: 33,
    marginRight: 5,
  },
  chatInformation: {
    flexDirection: 'column'
  },
  chatTitle: {
    fontSize: 14,
    marginRight: 5,
  },
  chatDescription: {
    fontSize: 11,
    color: '#737272',
    marginRight: 5,
  },
  chatTitleUnread: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  chatDescriptionUnread: {
    fontSize: 11,
    color: '#737272',
    marginRight: 5,
  },
  loginContainer: {
    marginTop: 600,
    marginBottom: 20,
    alignItems: 'center',
  },
})
