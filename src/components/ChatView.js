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

import MainLayout from './MainLayout'

var GiftedMessenger = require('react-native-gifted-messenger')
var Communications = require('react-native-communications')

var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight
var ExtraDimensions
if (Platform.OS === 'android') {
  ExtraDimensions = require('react-native-extra-dimensions-android')
  STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT')
}

class ChatView extends Component {
  constructor(props) {
    super(props)
    this._isMounted = false
    this._messages = this.getInitialMessages()
    this.state = {
      messages: this._messages,
      isLoadingEarlierMessages: false,
      typingMessage: '',
      allLoaded: false,
    }
  }

  componentDidMount() {
    this._isMounted = true

    // setTimeout(() => {
    //   this.setState({
    //     typingMessage: 'React-Bot is typing a message...',
    //   })
    // }, 1000) // simulating network

    // setTimeout(() => {
    //   this.setState({
    //     typingMessage: '',
    //   })
    // }, 3000) // simulating network


    // setTimeout(() => {
    //   this.handleReceive({
    //     text: 'Hello Awesome Developer',
    //     name: 'React-Bot',
    //     image: {uri: 'https://facebook.github.io/react/img/logo_og.png'},
    //     position: 'left',
    //     date: new Date(),
    //     uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
    //   })
    // }, 3300) // simulating network
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  getInitialMessages() {
    return [
      {
        text: 'Let Mads know where to meet you for MØ at 22:00 on Saturday',
        name: '',
        image: {uri: null},
        position: 'center',
        date: new Date(2016, 7, 2, 12, 24),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
      {
        text: 'Hey! :)',
        name: 'Mads',
        image: {uri: 'https://s3.eu-central-1.amazonaws.com/plusonedk/public/profile_pictures/person1.jpg'},
        position: 'left',
        date: new Date(2016, 7, 2, 12, 25),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
      {
        text: 'Where do you wanna meet?',
        name: 'Mads',
        image: {uri: 'https://s3.eu-central-1.amazonaws.com/plusonedk/public/profile_pictures/person1.jpg'},
        position: 'left',
        date: new Date(2016, 7, 2, 12, 26),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
      {
        text: 'Hey! Let\'s meet near the bar on the right? :)',
        name: 'Christian',
        image: null,
        position: 'right',
        date: new Date(2016, 7, 2, 12, 29),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
      {
        text: 'Sounds good to me, see you there!',
        name: 'Mads',
        image: {uri: 'https://s3.eu-central-1.amazonaws.com/plusonedk/public/profile_pictures/person1.jpg'},
        position: 'left',
        date: new Date(2016, 7, 2, 12, 30),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
      {
        text: 'Great! Can\'t wait :D',
        name: 'Christian',
        image: null,
        position: 'right',
        date: new Date(2016, 7, 2, 12, 31),
        uniqueId: Math.round(Math.random() * 10000), // simulating server-side unique id generation
      },
    ]
  }

  setMessageStatus(uniqueId, status) {
    let messages = []
    let found = false

    for (let i = 0; i < this._messages.length; i++) {
      if (this._messages[i].uniqueId === uniqueId) {
        let clone = Object.assign({}, this._messages[i])
        clone.status = status
        messages.push(clone)
        found = true
      } else {
        messages.push(this._messages[i])
      }
    }

    if (found === true) {
      this.setMessages(messages)
    }
  }

  setMessages(messages) {
    this._messages = messages

    // append the message
    this.setState({
      messages: messages,
    })
  }

  handleSend(message = {}) {

    // Your logic here
    // Send message.text to your server

    message.uniqueId = Math.round(Math.random() * 10000) // simulating server-side unique id generation
    this.setMessages(this._messages.concat(message))

    // mark the sent message as Seen
    setTimeout(() => {
      this.setMessageStatus(message.uniqueId, 'Seen') // here you can replace 'Seen' by any string you want
    }, 1000)

    // if you couldn't send the message to your server :
    // this.setMessageStatus(message.uniqueId, 'ErrorButton');
  }

  onLoadEarlierMessages() {
    // display a loader until you retrieve the messages from your server
    this.setState({
      isLoadingEarlierMessages: true,
    })

    // Your logic here
    // Eg: Retrieve old messages from your server

    // IMPORTANT
    // Oldest messages have to be at the begining of the array
    var earlierMessages = []

    setTimeout(() => {
      this.setMessages(earlierMessages.concat(this._messages)) // prepend the earlier messages to your list
      this.setState({
        isLoadingEarlierMessages: false, // hide the loader
        allLoaded: true, // hide the `Load earlier messages` button
      })
    }, 1000) // simulating network

  }

  handleReceive(message = {}) {
    // make sure that your message contains :
    // text, name, image, position: 'left', date, uniqueId
    this.setMessages(this._messages.concat(message))
  }

  onErrorButtonPress(message = {}) {
    // Your logic here
    // re-send the failed message

    // remove the status
    this.setMessageStatus(message.uniqueId, '')
  }

  // will be triggered when the Image of a row is touched
  onImagePress(message = {}) {
    // Your logic here
    // Eg: Navigate to the user profile
  }

  render() {
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
        messages={this.state.messages}
        handleSend={this.handleSend.bind(this)}
        onErrorButtonPress={this.onErrorButtonPress.bind(this)}
        maxHeight={Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT}

        loadEarlierMessagesButton={!this.state.allLoaded}
        onLoadEarlierMessages={this.onLoadEarlierMessages.bind(this)}

        senderName='Awesome Developer'
        senderImage={null}
        onImagePress={this.onImagePress}
        displayNames={true}

        parseText={true} // enable handlePhonePress, handleUrlPress and handleEmailPress
        handlePhonePress={this.handlePhonePress}
        handleUrlPress={this.handleUrlPress}
        handleEmailPress={this.handleEmailPress}

        isLoadingEarlierMessages={this.state.isLoadingEarlierMessages}

        typingMessage={this.state.typingMessage}
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
      var BUTTONS = [
        'Text message',
        'Call',
        'Cancel',
      ]
      var CANCEL_INDEX = 2

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

class ChatViewOld extends Component {

  render() {
    const { store } = this.context
    return (
      <MainLayout>
        <View>
          <Text style={styles.welcome}>
            Chat {this.props.chat.key}
          </Text>
          <Text>
            Participants:{"\n"}
            {this.props.chat.participants.map(function(participant) {
              return (
                <Text key={participant.name}>
                  {participant.name}{"\n"}
                </Text>
              )
            })}
          </Text>
          <Text>
            Playing on {this.props.chat.concert.day}, {this.props.chat.concert.time} at {this.props.chat.concert.location}!
          </Text>
        </View>
      </MainLayout>
    )
  }
}

ChatView.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ChatView.propTypes = {
  routes: React.PropTypes.object,
  chat: React.PropTypes.object.isRequired
}

module.exports = ChatView

// const mapStateToProps = function(state) {
//   return {
//     routes: state.routes
//   }
// }

// module.exports = connect(mapStateToProps)(ChatView)

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
