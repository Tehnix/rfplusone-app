import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'

class ConcertList extends Component {

  render() {
    const { store } = this.context;
    return (
      <View>
        <Text style={styles.welcome}>
          A list of concerts!
        </Text>
      </View>
    )
  }
}
ConcertList.contextTypes = {
  store: React.PropTypes.object
}
ConcertList.propTypes = {}

const mapStateToProps = function(state) {
  return {}
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
})

module.exports = connect(mapStateToProps)(ConcertList)
