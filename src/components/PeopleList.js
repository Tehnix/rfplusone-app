import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import {
  sendLike,
  sendNotLike,
} from '../actions/Interest'
import {
  fetchConcert
} from '../actions/Refresh'


class PeopleList extends Component {
  _filterAttendees(interest, attendees) {
    filteredAttendees = []
    const arrayLength = attendees.length
    for (let i = 0; i < arrayLength; i++) {
      const attendee = attendees[i]
      if (interest.individual && attendee.interest.individual && !attendee.friend) {
        filteredAttendees.push(attendee)
      } else if (interest.attending) {
        filteredAttendees.push(attendee)
      }
    }
    return filteredAttendees
  }

  render() {
    const { store } = this.context
    const sessionToken = this.props.sessionToken
    const concertId = this.props.concertId
    let interest = this.props.interest[concertId]
    if (interest == undefined) {
      interest = {attending: false, individual: false, group: false}
    }
    let containerStyle = styles.orangeContainer
    let attendees = []
    if (this.props.attendees[concertId]) {
      attendees = this._filterAttendees(interest, this.props.attendees[concertId])
    }
    let attendeeComponents
    if (!interest.group) {
      // Construct the list of attendees
      attendeeComponents = (attendees).map(function(attendee) {
        let name = attendee.name
        if (!attendee.friend) {
          name = attendee.name.split(' ')[0]
        }
        let likeStatus
        if (attendee.likes_you && attendee.you_like) {
          likeStatus = (
            <View style={styles.likeContainer}>
              <Text style={styles.pressToChat}>
                Press to chat!
              </Text>
            </View>
          )
        } else if (attendee.likes_you) {
          likeStatus = (
            <View style={styles.likeContainer}>
              <Text style={styles.waitingForYou}>
                Waiting for your +1
              </Text>
            </View>
          )
        } else if (attendee.you_like) {
          likeStatus = (
            <View style={styles.likeContainer}>
              <Text style={styles.youLike}>
                +1
              </Text>
            </View>
          )
        }
        return (
          <TouchableOpacity key={attendee.profile_id}
                            style={styles.personContainer}
                            onPress={() => {
                              if (attendee.you_like) {
                                sendNotLike(sessionToken, store.dispatch, concertId, attendee.profile_id, false)
                                fetchConcert(sessionToken, store, concertId)
                              } else {
                                sendLike(sessionToken, store.dispatch, concertId, attendee.profile_id, false)
                                fetchConcert(sessionToken, store, concertId)
                              }
                            }}>
            <Image style={styles.profilePicture}
                   source={{uri: attendee.picture}}/>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.person}>
                {name}
              </Text>
              <Text style={styles.concertMatch}>
                Matching concerts: {attendee.mutual_concerts}
              </Text>
            </View>
            <View style={styles.likeContainer}>
              {likeStatus}
            </View>
          </TouchableOpacity>
        )
      })
    } else {
      attendeeComponents = (
        <Text>
          Looking for an awesome group!
        </Text>
      )
    }
    return (
      <View style={containerStyle}>
        {attendeeComponents}
      </View>
    )
  }
}

PeopleList.contextTypes = {
  store: React.PropTypes.object.isRequired
}

PeopleList.propTypes = {
  routes: React.PropTypes.object,
  concertId: React.PropTypes.number.isRequired,
  attendees: React.PropTypes.object.isRequired,
  interest: React.PropTypes.object.isRequired,
  sessionToken: React.PropTypes.string.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    attendees: state.attendees.attendees,
    interest: state.interest.interest,
    sessionToken: state.login.sessionToken,
  }
}

module.exports = connect(mapStateToProps)(PeopleList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  orangeContainer: {
    flex: 1,
    backgroundColor: 'white', // #feebda
  },
  personContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 5,
    paddingLeft: 0,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(123, 123, 123, 0.1)',
  },
  person: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  concertMatch: {
    fontSize: 9,
    color: '#737272',
  },
  likeContainer: {
    flex: 1,
    alignItems: 'flex-end',
    marginRight: 5,
  },
  waitingForYou: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00929d',
  },
  pressToChat: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#00cb63',
  },
  youLike: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  profilePicture: {
    width: 35,
    height: 35,
    marginRight: 5,
  }
})
