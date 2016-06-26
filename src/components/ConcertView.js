import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import { connect } from 'react-redux'

import {
  weekdayFromDate,
  getHourMinutesFromDate,
} from '../Utility'

import MainLayout from './MainLayout'
import ConcertActions from './ConcertActions'
import PeopleList from './PeopleList'

class ConcertView extends Component {

  render() {
    const { store } = this.context
    const startDate = new Date(this.props.concert.start_time)
    return (
      <MainLayout>
        <View style={styles.container}>
          <Image style={styles.bannerImage}
                 source={{uri: this.props.concert.images[0].url}}>
           <View style={styles.concertInfoContainer}>
             <Text style={styles.concertInfoTop}>
               {weekdayFromDate(startDate).toUpperCase()}
             </Text>
           </View>
           <View style={styles.concertInfoContainer}>
             <Text style={styles.concertInfo}>
               {getHourMinutesFromDate(startDate)}
             </Text>
           </View>
           <View style={styles.concertInfoContainer}>
             <Text style={styles.concertInfo}>
               {this.props.concert.venue.toUpperCase()}
             </Text>
           </View>
           <View style={styles.artistContainer}>
             <Text numberOfLines={1}  style={styles.artistName}>
               {this.props.concert.artist.toUpperCase()}
             </Text>
           </View>
          </Image>
          <ConcertActions concertId={this.props.concert.id}/>
          <PeopleList concertId={this.props.concert.id}/>
        </View>
      </MainLayout>
    )
  }
}

ConcertView.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ConcertView.propTypes = {
  routes: React.PropTypes.object,
  concert: React.PropTypes.object.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
  }
}

module.exports = connect(mapStateToProps)(ConcertView)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  artistContainer: {
    alignItems: 'flex-start',
  },
  artistName: {
    fontSize: 16,
    textAlign: 'left',
    color: 'orange',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 45,
    marginLeft: 5,
  },
  concertInfoContainer: {
    alignItems: 'flex-end',
  },
  concertInfo: {
    fontSize: 14,
    textAlign: 'right',
    color: 'orange',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingLeft: 3,
    paddingRight: 3,
    marginRight: 5,
  },
  concertInfoTop: {
    fontSize: 14,
    textAlign: 'right',
    color: 'orange',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    paddingLeft: 3,
    paddingRight: 3,
    marginTop: 10,
    marginRight: 5,
  },
  bannerImage: {
    height: 130,
  },
})
