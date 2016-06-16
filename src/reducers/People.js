import {
  UPDATE_PEOPLE_LIST
} from '../actions/People'

const initialState = {
  people: {
    1: {
      friends: [
        {key: 1, name: 'Alexander Magnusson', picture: {profile: '...'}},
        {key: 2, name: 'Emilia Jensen', picture: {profile: '...'}},
        {key: 3, name: 'Line Elmsbæk', picture: {profile: '...'}},
        {key: 4, name: 'Maiken Rasmussen', picture: {profile: '...'}},
        {key: 5, name: 'Mille Christensen', picture: {profile: '...'}},
        {key: 6, name: 'Torben Clausen', picture: {profile: '...'}},
        {key: 7, name: 'Chris Larsen', picture: {profile: '...'}}
      ],
      plusOne: [
        {key: 8, name: 'Mads', concertMatch: 12, picture: {profile: '...'}},
        {key: 9, name: 'Mille', concertMatch: 10, picture: {profile: '...'}},
        {key: 10, name: 'Aleksandra', concertMatch: 9, picture: {profile: '...'}},
        {key: 11, name: 'Magnus', concertMatch: 7, picture: {profile: '...'}},
        {key: 12, name: 'Emilia', concertMatch: 7, picture: {profile: '...'}},
        {key: 13, name: 'Torben', concertMatch: 6, picture: {profile: '...'}},
        {key: 14, name: 'Maiken', concertMatch: 4, picture: {profile: '...'}}
      ]
    },
    2: {
      friends: [
        {key: 1, name: 'Alexander Magnusson', picture: {profile: '...'}},
        {key: 2, name: 'Emilia Jensen', picture: {profile: '...'}},
        {key: 3, name: 'Line Elmsbæk', picture: {profile: '...'}},
        {key: 4, name: 'Maiken Rasmussen', picture: {profile: '...'}},
        {key: 5, name: 'Mille Christensen', picture: {profile: '...'}},
        {key: 6, name: 'Torben Clausen', picture: {profile: '...'}},
        {key: 7, name: 'Chris Larsen', picture: {profile: '...'}}
      ],
      plusOne: [
        {key: 8, name: 'Mads', concertMatch: 12, picture: {profile: '...'}},
        {key: 9, name: 'Mille', concertMatch: 10, picture: {profile: '...'}},
        {key: 10, name: 'Aleksandra', concertMatch: 9, picture: {profile: '...'}},
        {key: 11, name: 'Magnus', concertMatch: 7, picture: {profile: '...'}},
        {key: 12, name: 'Emilia', concertMatch: 7, picture: {profile: '...'}},
        {key: 13, name: 'Torben', concertMatch: 6, picture: {profile: '...'}},
        {key: 14, name: 'Maiken', concertMatch: 4, picture: {profile: '...'}}
      ]
    }
  }
}

export function people(state = initialState, action) {
  switch (action.type) {
  case UPDATE_PEOPLE_LIST:
    return Object.assign({}, state, {
      people: action.people
    })
  default:
    return state
  }
}
