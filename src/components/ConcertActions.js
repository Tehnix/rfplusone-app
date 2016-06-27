import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Alert,
} from 'react-native'
import { connect } from 'react-redux'
import Button from 'react-native-button'

import {
  setConcertInterest,
  sendAttendingInterest,
  sendNotAttendingInterest,
  sendIndividualInterest,
  sendNotIndividualInterest,
  sendGroupInterest,
  sendNotGroupInterest,
} from '../actions/Interest'

class ConcertActions extends Component {

  _buttonDisplay(sessionToken, interest) {
    const attendingText = 'Attending'
    const plusOneText = '+1'
    const activePlusOneText = 'Find yourself a +1'
    const groupText = '+8'
    const activeGroupText = 'Get ready!'
    const setToIndividual = {attending: false, individual: true, group: false}
    const setToGroup = {attending: false, individual: false, group: true}
    const setToAttending = {attending: true, individual: false, group: false}
    const setToNone = {attending: false, individual: false, group: false}
    let buttons
    if (interest.individual) {
      return (
        <View style={styles.container}>
          <View style={styles.selected}>
            <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToIndividual)}
                    containerStyle={{flex: 1}}
                    style={styles.plusOne}>
              {activePlusOneText}
            </Button>
          </View>
          <View style={styles.notSelected}>
            <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToAttending)}
                    containerStyle={{flex: 0.5}}
                    style={styles.attending}>
              {attendingText}
            </Button>
            <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToGroup)}
                    containerStyle={{flex: 0.5}}
                    style={styles.group}>
              {groupText}
            </Button>
          </View>
        </View>
      )
    } else if (interest.group) {
      return (
        <View style={styles.container}>
          <View style={styles.selected}>
            <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToGroup)}
                    containerStyle={{flex: 1}}
                    style={styles.group}>
              {activeGroupText}
            </Button>
          </View>
          <View style={styles.notSelected}>
            <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToIndividual)}
                    containerStyle={{flex: 0.5}}
                    style={styles.plusOne}>
              {plusOneText}
            </Button>
            <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToAttending)}
                    containerStyle={{flex: 0.5}}
                    style={styles.attending}>
              {attendingText}
            </Button>
          </View>
        </View>
      )
    } else if (interest.attending) {
      return (
        <View style={styles.container}>
          <View style={styles.selected}>
            <Button onPress={() => Alert.alert(
              'Unattending',
              'Are you sure you want to unattend?',
              [
                {text: 'Cancel'},
                {text: 'Yes', onPress: () => this.props.setConcertInterest(sessionToken, this.props.concertId, setToNone)},
              ]
            )}
                    containerStyle={{flex: 1}}
                    style={styles.attending}>
              {attendingText}
            </Button>
          </View>
          <View style={styles.notSelected}>
            <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToIndividual)}
                    containerStyle={{flex: 0.5}}
                    style={styles.plusOne}>
              {plusOneText}
            </Button>
            <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToGroup)}
                    containerStyle={{flex: 0.5}}
                    style={styles.group}>
              {groupText}
            </Button>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.selected}>
          <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToAttending)}
                  containerStyle={{flex: 1}}
                  style={styles.attending}>
            Set Yourself as {attendingText}
          </Button>
        </View>
        <View style={styles.notSelected}>
          <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToIndividual)}
                  containerStyle={{flex: 0.5}}
                  style={styles.plusOne}>
            {plusOneText}
          </Button>
          <Button onPress={() => this.props.setConcertInterest(sessionToken, this.props.concertId, setToGroup)}
                  containerStyle={{flex: 0.5}}
                  style={styles.group}>
            {groupText}
          </Button>
        </View>
      </View>
    )
  }

  render() {
    const { store } = this.context
    let interest = this.props.interest[this.props.concertId]
    if (interest == undefined) {
      interest = {attending: false, individual: false, group: false}
    }
    return (
      <View>
        {this._buttonDisplay(this.props.sessionToken, interest)}
      </View>
    )
  }
}

ConcertActions.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ConcertActions.propTypes = {
  routes: React.PropTypes.object,
  sessionToken: React.PropTypes.string.isRequired,
  concertId: React.PropTypes.number.isRequired,
  interest: React.PropTypes.object.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    sessionToken: state.login.sessionToken,
    interest: state.interest.interest,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    setConcertInterest: (sessionKey, concertId, interest) => {
      if (interest.attending) {
        sendNotIndividualInterest(sessionKey, dispatch, concertId, false)
        sendNotGroupInterest(sessionKey, dispatch, concertId, false)
        sendAttendingInterest(sessionKey, dispatch, concertId, false)
      } else if (interest.individual) {
        sendNotGroupInterest(sessionKey, dispatch, concertId, false)
        sendIndividualInterest(sessionKey, dispatch, concertId, false)
      } else if (interest.group) {
        sendNotIndividualInterest(sessionKey, dispatch, concertId, false)
        sendGroupInterest(sessionKey, dispatch, concertId, false)
      } else {
        sendNotAttendingInterest(sessionKey, dispatch, concertId, false)
      }
      dispatch(setConcertInterest(concertId, interest))
    },
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConcertActions)

const styles = StyleSheet.create({
  container: {},
  selected: {
    flexDirection: 'column',
  },
  notSelected: {
    flexDirection: 'row',
  },
  attending: {
    backgroundColor: '#FAAC3D',
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  plusOne: {
    backgroundColor: '#ff912f',
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  },
  group: {
    backgroundColor: '#ffc08b',
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 10,
    paddingBottom: 10,
  }
})
