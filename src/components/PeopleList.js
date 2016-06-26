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
    const filter = this.props.concerts[this.props.concertKey].status
    let containerStyle
    let peopleList
    if (filter == 'group') {
      containerStyle = styles.orangeContainer
      // ...
    } else if (filter == 'plusOne') {
      containerStyle = styles.orangeContainer
      peopleList = this.props.people[this.props.concertKey].plusOne
    } else {
      containerStyle = styles.orangeContainer
      peopleList = this.props.people[this.props.concertKey].friends
    }
    let peopleComponents
    if (filter != 'group') {
      peopleComponents = (peopleList).map(function(person) {
        return (
          <View key={person.key} style={styles.personContainer}>
            <Image style={styles.profilePicture}
                   source={{uri: person.picture.profile}}/>
            <Text style={styles.person}>
              {person.name}
            </Text>
          </View>
        )
      })
    } else {
      peopleComponents = (
        <Text>
          Looking for an awesome group!
        </Text>
      )
    }
    return (
      <View style={containerStyle}>
        {peopleComponents}
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
  concerts: React.PropTypes.object.isRequired,
}

const mapStateToProps = function(state) {
  return {
    routes: state.routes,
    people: state.people.people,
    concerts: state.concerts.concerts,
  }
}

module.exports = connect(mapStateToProps)(PeopleList)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  orangeContainer: {
    backgroundColor: '#feebda',
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
    marginRight: 10,
  }
})
