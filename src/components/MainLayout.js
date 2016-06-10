import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { connect } from 'react-redux'

class MainLayout extends Component {

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
MainLayout.contextTypes = {
  store: React.PropTypes.object
}
MainLayout.propTypes = {}

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

module.exports = connect(mapStateToProps)(MainLayout)
