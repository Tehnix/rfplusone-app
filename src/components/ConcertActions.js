import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import Button from 'react-native-button'

import { setConcertStatus } from '../actions/Concerts'

class ConcertActions extends Component {

  _buttonDisplay(filter) {
    const attendingText = 'Attending'
    const plusOneText = '+1'
    const groupText = '+8'
    let buttons
    if (filter == 'plusOne') {
      return (
        <View style={styles.container}>
          <View style={styles.selected}>
            <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'plusOne')}
                    containerStyle={{flex: 1}}
                    style={styles.plusOne}>
              {plusOneText}
            </Button>
          </View>
          <View style={styles.notSelected}>
            <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'attending')}
                    containerStyle={{flex: 0.5}}
                    style={styles.attending}>
              {attendingText}
            </Button>
            <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'group')}
                    containerStyle={{flex: 0.5}}
                    style={styles.group}>
              {groupText}
            </Button>
          </View>
        </View>
      )
    } else if (filter == 'group') {
      return (
        <View style={styles.container}>
          <View style={styles.selected}>
            <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'group')}
                    containerStyle={{flex: 1}}
                    style={styles.group}>
              {groupText}
            </Button>
          </View>
          <View style={styles.notSelected}>
            <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'plusOne')}
                    containerStyle={{flex: 0.5}}
                    style={styles.plusOne}>
              {plusOneText}
            </Button>
            <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'attending')}
                    containerStyle={{flex: 0.5}}
                    style={styles.attending}>
              {attendingText}
            </Button>
          </View>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <View style={styles.selected}>
          <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'attending')}
                  containerStyle={{flex: 1}}
                  style={styles.attending}>
            {attendingText}
          </Button>
        </View>
        <View style={styles.notSelected}>
          <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'plusOne')}
                  containerStyle={{flex: 0.5}}
                  style={styles.plusOne}>
            {plusOneText}
          </Button>
          <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'group')}
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
    const filter = this.props.concerts[this.props.concertKey].status
    return (
      <View>
        {this._buttonDisplay(filter)}
      </View>
    )
  }
}

ConcertActions.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ConcertActions.propTypes = {
  routes: React.PropTypes.object,
  concertKey: React.PropTypes.number.isRequired,
  concerts: React.PropTypes.object.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    concerts: state.concerts.concerts,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    setConcertStatus: (concertKey, status) => {
      dispatch(setConcertStatus(concertKey, status))
    }
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
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 13,
    paddingBottom: 13,
  },
  plusOne: {
    backgroundColor: '#00C15E',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 13,
    paddingBottom: 13,
  },
  group: {
    backgroundColor: '#1C77BA',
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 13,
    paddingBottom: 13,
  }
})
