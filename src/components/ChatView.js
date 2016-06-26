import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Navigator,
  Platform,
  ActionSheetIOS,
  Linking,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { ENDPOINTS } from '../stores/Constants'

import {
  setChatState,
  newChatMessage,
} from '../actions/Chats'
import {
  getConcertFromId,
  weekdayFromDate,
  getHourMinutesFromDate,
} from '../Utility'

import MainLayout from './MainLayout'

const FBSDK = require('react-native-fbsdk')
const {
  AppEventsLogger,
} = FBSDK
// Usage: AppEventsLogger.logEvent('Event')

var GiftedMessenger = require('react-native-gifted-messenger')
var Communications = require('react-native-communications')

var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight
var ExtraDimensions
if (Platform.OS === 'android') {
  ExtraDimensions = require('react-native-extra-dimensions-android')
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT')
}

class ChatView extends Component {
  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  handleSend(concert, message = {}) {
    const { store } = this.context
    const uniqueId = Math.round(Math.random() * 10000)
    message.uniqueId = uniqueId
    fetch(ENDPOINTS.message(this.props.chat.id), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Token token=' + this.props.sessionToken
      },
      body: JSON.stringify({
        message: {
          text: message.text
        }
      })
    })
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {})
    .catch((error) => {})
    .done()
    AppEventsLogger.logEvent('Sent Message', {'Concert': concert.artist})
    store.dispatch(newChatMessage(this.props.chat.id, message))
  }

  handleReceive(message = {}) {
    const { store } = this.context
    // make sure that your message contains :
    // text, name, image, position: 'left', date, uniqueId
    const uniqueId = Math.round(Math.random() * 10000)
    message.uniqueId = uniqueId
    store.dispatch(newChatMessage(this.props.chat.id, message))
  }

  onErrorButtonPress(message = {}) {
    // Your logic here
    // re-send the failed message
    // Remove the status
    // this.setMessageStatus(message.uniqueId, '')
  }

  // Will be triggered when the Image of a row is touched
  onImagePress(message = {}) {
    // Your logic here
    // Eg: Navigate to the user profile
  }

  _generateWelcomeMessage(participants, concert) {
    let namesArray = []
    const arrayLength = participants.length
    for (let i = 0; i < arrayLength; i++) {
      const participant = participants[i]
      namesArray.push(participant.name.split(' ')[0])
    }
    const names = namesArray.join(', ')
    const startDate = new Date(concert.start_time)
    const day = weekdayFromDate(startDate)
    const time = getHourMinutesFromDate(startDate)
    const welcomeMessage = {
      text: 'Let ' + names + ' know where to meet you for ' + concert.artist + ' at ' + time + ', ' + day + ' on ' + concert.venue,
      name: '',
      image: {uri: null},
      position: 'center',
      date: new Date('1992-12-22'),
      uniqueId: 1, // simulating server-side unique id generation
    }
    return welcomeMessage
  }

  render() {
    const { store } = this.context
    const concert = getConcertFromId(this.props.chat.concert_id, this.props.concerts)
    const chatState = this.props.chatState[this.props.chat.id]
    let messages = [this._generateWelcomeMessage(this.props.chat.participants, concert)]
    if (chatState.messages) {
      messages = messages.concat(chatState.messages)
    }
    return (
      <GiftedMessenger
        ref={(c) => this._GiftedMessenger = c}

        styles={{
          bubbleRight: {
            marginLeft: 70,
            backgroundColor: 'orange',
          },
          bubbleCenter: {
            marginLeft: 10,
            marginRight: 10,
            backgroundColor: 'transparent',
          },
          container: {
            flex: 1,
            backgroundColor: '#FFF',
            marginTop: 63,
          },
        }}

        autoFocus={false}
        messages={messages}
        handleSend={this.handleSend.bind(this, concert)}
        onErrorButtonPress={this.onErrorButtonPress.bind(this)}
        maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT}
        loadEarlierMessagesButton={!chatState.allLoaded}

        senderName={this.props.facebookFirstName}
        senderImage={null}
        onImagePress={this.onImagePress}
        displayNames={true}

        parseText={true} // enable handlePhonePress, handleUrlPress and handleEmailPress
        handlePhonePress={this.handlePhonePress}
        handleUrlPress={this.handleUrlPress}
        handleEmailPress={this.handleEmailPress}
      />
    )
  }

  handleUrlPress(url) {
    Linking.openURL(url)
  }

  // TODO
  // make this compatible with Android
  handlePhonePress(phone) {
    if (Platform.OS !== 'android') {
      let BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ]
      let CANCEL_INDEX = 2

      ActionSheetIOS.showActionSheetWithOptions({
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX
      },
      (buttonIndex) => {
        switch (buttonIndex) {
        case 0:
          Communications.phonecall(phone, true)
          break
        case 1:
          Communications.text(phone)
          break
        }
      })
    }
  }

  handleEmailPress(email) {
    Communications.email(email, null, null, null, null)
  }
}

ChatView.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ChatView.propTypes = {
  routes: React.PropTypes.object,
  sessionToken: React.PropTypes.string.isRequired,
  chat: React.PropTypes.object.isRequired,
  chatState: React.PropTypes.object.isRequired,
  concerts: React.PropTypes.array.isRequired,
  facebookFullName: React.PropTypes.string.isRequired,
  facebookFirstName: React.PropTypes.string.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    sessionToken: state.login.sessionToken,
    concerts: state.concerts.concerts,
    chatState: state.chats.chatState,
    facebookFullName: state.login.facebookFullName,
    facebookFirstName: state.login.facebookFirstName
  }
}

module.exports = connect(mapStateToProps)(ChatView)

const styles = StyleSheet.create({})
