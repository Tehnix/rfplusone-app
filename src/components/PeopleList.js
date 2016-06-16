import React, { PropTypes, Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import { connect } from 'react-redux'

class PeopleList extends Component {

  render() {
    const { store } = this.context
    let peopleList
    if (this.props.filter == 'plusOne') {
      peopleList = this.props.people[this.props.concertKey].plusOne
    } else {
      peopleList = this.props.people[this.props.concertKey].friends
    }
    return (
      <View style={styles.container}>
        {(peopleList).map(function(person) {
          return (
            <View key={person.key} style={styles.personContainer}>
              <Image style={styles.profilePicture}
                     source={require('../../graphics/profileFiller.png')}/>
              <Text style={styles.person}>
                {person.name}
              </Text>
            </View>
          )
        })}
      </View>
    )
  }
}

PeopleList.contextTypes = {
  store: React.PropTypes.object.isRequired
}

PeopleList.propTypes = {
  routes: React.PropTypes.object,
  people: React.PropTypes.object.isRequired,
  concertKey: React.PropTypes.number.isRequired,
  filter: React.PropTypes.string.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    people: state.people.people,
  }
}

module.exports = connect(mapStateToProps)(PeopleList)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
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
    fontSize: 12,
    fontWeight: 'bold',
  },
  profilePicture: {
    width: 40,
    height: 40,
    marginRight: 5,
  }
})
