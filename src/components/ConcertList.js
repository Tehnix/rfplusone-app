import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableHighlight
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'

import MainLayout from './MainLayout'

class ConcertList extends Component {
  render() {
    const { store } = this.context
    const concerts = this.props.concerts
    return (
      <MainLayout>
        <View style={styles.container}>
          {Object.keys(concerts).map(function(key, iteratorCount) {
            const concert = concerts[key]
            return (
              <TouchableHighlight key={concert.key}
                                  style={styles.concertContainer}
                                  onPress={() => Actions.concertView({title: concert.artist, concert: concert})}>
                <Image style={styles.concertThumbnail}
                       source={{uri: concert.picture.banner}}>
               <View style={styles.concertInfoContainer}>
                 <Text style={styles.concertInfoTop}>
                   {concert.day.toUpperCase()}, {concert.time}
                 </Text>
               </View>
               <View style={styles.concertInfoContainer}>
                 <Text style={styles.concertInfo}>
                   <Image style={styles.friendIcon}
                          source={require('../../graphics/friendIcon.png')}/>
                    {"  "}{concert.attending.friends} friends
                 </Text>
               </View>
               <View style={styles.concertInfoContainer}>
                 <Text style={styles.concertInfo}>
                   <Image style={styles.friendIcon}
                          source={require('../../graphics/friendIcon.png')}/>
                    {"  "}{concert.attending.total} total
                 </Text>
               </View>
                <View style={styles.concertNameContainer}>
                  <Text style={styles.concertName}>
                    {concert.artist}
                  </Text>
                </View>
                </Image>
              </TouchableHighlight>
            )
          })}
        </View>
      </MainLayout>
    )
  }
}

ConcertList.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ConcertList.propTypes = {
  routes: React.PropTypes.object,
  concerts: React.PropTypes.object.isRequired
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    concerts: state.concerts.concerts,
  }
}

const mapDispatchToProps = function(dispatch) {
  return {}
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(ConcertList)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  concertContainer: {
    flex: 0.5,
    marginBottom: 2,
  },
  concertThumbnail: {
    height: 130,
  },
  friendIcon: {
    height: 10,
    width: 10,
    marginTop: 4,
  },
  concertInfoContainer: {
    alignItems: 'flex-end',
  },
  concertInfo: {
    fontSize: 11,
    textAlign: 'right',
    color: 'orange',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingLeft: 3,
    paddingRight: 3,
    marginRight: 5,
    paddingTop: 3,
  },
  concertInfoTop: {
    fontSize: 11,
    textAlign: 'right',
    color: 'orange',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 10,
    marginRight: 5,
  },
  concertNameContainer: {
    alignItems: 'flex-start',
    position: 'absolute',
    bottom: 5,
    marginLeft: 5,
  },
  concertName: {
    fontSize: 13,
    textAlign: 'left',
    color: 'orange',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
})
