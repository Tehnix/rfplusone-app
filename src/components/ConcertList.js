import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  TouchableHighlight,
  ScrollView,
  Navigator,
  Dimensions,
} from 'react-native'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import Button from 'react-native-button'

import { setConcertFilter } from '../actions/Concerts'
import { ENDPOINTS } from '../stores/Constants'

import {
  weekdayFromDate,
  getHourMinutesFromDate,
} from '../Utility'

import MainLayout from './MainLayout'


class ConcertList extends Component {
  render() {
    const { store } = this.context
    const navigatorTopMargin = Navigator.NavigationBar.Styles.General.StatusBarHeight + Navigator.NavigationBar.Styles.General.NavBarHeight
    const {screenHeight, screenWidth} = Dimensions.get('window')
    const pictureHeight = screenWidth * 0.5625
    const concertsFilter = this.props.concertsActiveFilter
    const filterDateList = this.props.concertsFilters
    const filteredConcerts = this.props.filteredConcerts

    return (
      <View style={{flex: 1, marginTop: navigatorTopMargin}}>
        <View>
          <ScrollView ref='scrollView'
                      style={styles.dateContainer}
                      contentContainerStyle={styles.dateContentContainer}
                      horizontal={true}
                      showsHorizontalScrollIndicator={false}>
            {Object.keys(filterDateList).map(function(key, iteratorCount) {
              const filterDate = filterDateList[key]
              let dateContainerTextStyle = styles.dateContainerText
              if (concertsFilter == filterDate) {
                dateContainerTextStyle = styles.dateContainerTextActive
              }
              return (
                <Button key={key}
                        onPress={() => store.dispatch(setConcertFilter(filterDate))}
                        style={dateContainerTextStyle}>
                  {key}
                </Button>
              )
            })}
          </ScrollView>
        </View>
        <MainLayout withoutTopMargin={true}>
          <View style={styles.container}>
            {Object.keys(filteredConcerts).map(function(key, iteratorCount) {
              const concert = filteredConcerts[key]
              const startDate = new Date(concert.start_time)
              return (
                <TouchableHighlight key={concert.id}
                                    style={styles.concertContainer}
                                    onPress={() => Actions.concertView({title: concert.artist, concert: concert})}>
                  <Image style={styles.concertThumbnail}
                         source={{uri: concert.images[0].url}}>
                 <View style={styles.concertInfoContainer}>
                   <Text style={styles.concertInfoTop}>
                     {weekdayFromDate(startDate).toUpperCase()}, {getHourMinutesFromDate(startDate)}
                   </Text>
                 </View>
                 <View style={styles.concertInfoContainer}>
                   <Text style={styles.concertInfo}>
                     <Image style={styles.friendIcon}
                            source={require('../../graphics/friendIcon.png')}/>
                      {"  "}{concert.num_friend_attendees} friends
                   </Text>
                 </View>
                 <View style={styles.concertInfoContainer}>
                   <Text style={styles.concertInfo}>
                     <Image style={styles.friendIcon}
                            source={require('../../graphics/friendIcon.png')}/>
                      {"  "}{concert.num_attendees} total
                   </Text>
                 </View>
                  <View style={styles.concertNameContainer}>
                    <Text numberOfLines={1} style={styles.concertName}>
                      {concert.artist}
                    </Text>
                  </View>
                  </Image>
                </TouchableHighlight>
              )
            })}
          </View>
        </MainLayout>
      </View>
    )
  }
}

// {uri: concert.images[0].url}
// getArtistBanner(concert)
// {height: 100, width: screenWidth, resizeMode: 'stretch'}

ConcertList.contextTypes = {
  store: React.PropTypes.object.isRequired
}

ConcertList.propTypes = {
  routes: React.PropTypes.object,
  concerts: React.PropTypes.array.isRequired,
  filteredConcerts: React.PropTypes.object.isRequired,
  concertsActiveFilter: React.PropTypes.string.isRequired,
  concertsFilters: React.PropTypes.object.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    concerts: state.concerts.concerts,
    filteredConcerts: state.concerts.filteredConcerts,
    concertsActiveFilter: state.concerts.activeFilter,
    concertsFilters: state.concerts.filters,
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
  dateContainer: {
    backgroundColor: '#262626',
    flexDirection: 'row',
    paddingLeft: 5,
  },
  dateContentContainer: {
    alignItems: 'center',
    height: 40,
    paddingRight: 20,
  },
  dateContainerText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 20,
    marginRight: 10,
  },
  dateContainerTextActive: {
    color: 'orange',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
    marginRight: 10,
  },
  concertContainer: {
    flex: 0.5,
    marginBottom: 2,
  },
  concertThumbnail: {
    height: 100,
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
