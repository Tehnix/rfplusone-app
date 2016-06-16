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

  render() {
    const { store } = this.context
    return (
        <View style={styles.container}>
          <View style={styles.selected}>
            <Button onPress={() => this.props.setConcertStatus(this.props.concertKey, 'attending')}
                    containerStyle={{flex: 1}}
                    style={styles.attending}>
              Attending
            </Button>
          </View>
          <View style={styles.notSelected}>
            <Button containerStyle={{flex: 0.5}} style={styles.plusOne}>
              +1
            </Button>
            <Button containerStyle={{flex: 0.5}} style={styles.group}>
              +8
            </Button>
          </View>
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
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes
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
