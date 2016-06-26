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
  setChatUnreadCount
} from '../actions/Chats'

import { getConcertFromId } from '../Utility'

import MainLayout from './MainLayout'
import FBLoginButton from './FBLoginButton'

class ChatList extends Component {
  _concatenateParticipants(participants) {
    let names = []
    const arrayLength = participants.length
    for (let i = 0; i < arrayLength; i++) {
      const participant = participants[i]
      names.push(participant.name)
    }
    names = names.join(', ')
    if (names.length > 33) {
      return names.substring(0, 33) + '...'
    }
    return names
  }

  render() {
    const { store } = this.context
    const concerts = this.props.concerts
    const concatenateParticipants = this._concatenateParticipants
    return (
      <MainLayout>
        <View style={styles.container}>
          {this.props.chats.map(function(chat) {
            const concert = getConcertFromId(chat.concert_id, concerts)
            let chatName = 'Chat'
            let titleName = 'Chat'
            if (chat.participants.length == 1) {
              chatName = '+1 ' + chat.participants[0].name
              titleName = chatName
            } else if (chat.participants.length > 1) {
              chatName = '+8 ' + concatenateParticipants(chat.participants)
              if (chatName.length > 30) {
                titleName = chatName.substring(0, 30) + '...'
              }
            }
            let chatTitleStyle = styles.chatTitle
            let chatDescriptionStyle = styles.chatDescription
            if (chat.unreadCount > 0) {
              chatTitleStyle = styles.chatTitleUnread
              chatDescriptionStyle = styles.chatDescriptionUnread
            }
            return (
              <TouchableOpacity key={chat.id}
                                  style={styles.chatItemContainer}
                                  onPress={() => Actions.chatView({title: titleName, chat: chat, concert: concert})}>
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

ChatList.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ChatList.propTypes = {
  routes: React.PropTypes.object,
  chats: React.PropTypes.array.isRequired,
  concerts: React.PropTypes.array.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    chats: state.chats.chats,
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
})
