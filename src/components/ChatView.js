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

class ChatView extends Component {

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

const mapStateToProps = function(state) {
  return {
    routes: state.routes
  }
}

module.exports = connect(mapStateToProps)(ChatView)

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})
