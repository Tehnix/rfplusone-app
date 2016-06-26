import {REHYDRATE} from 'redux-persist/constants'
import {
  UPDATED_CONCERT_LIST,
  UPDATING_CONCERT_LIST,
  SET_CONCERT_STATUS,
  SET_CONCERT_FILTER
} from '../actions/Concerts'
import { concertsInitialData } from '../stores/ConcertsInitialData'

import {
  getToday,
  getDateFromDate,
  subtractMinutesFromDate,
} from '../Utility'

function setActiveFilter(filters, defaultFilter) {
  const today = getToday()
  for (const key in filters) {
    if (!filters.hasOwnProperty(key)) {
      continue
    }
    if (today == filters[key]) {
      return filters[key]
    }
  }
  return defaultFilter
}

function filterConcerts(filter, concerts) {
  let filteredList = {}
  const arrayLength = concerts.length
  for (let i = 0; i < arrayLength; i++) {
    const concert = concerts[i]
    // Only add concerts that match the filter and have images
    if (concert.images[0].url == '') {
      continue
    }
    if (filter == 'All' || filter == 'all') {
      filteredList[i] = concert
      continue
    }
    if (!concert.start_time) {
      continue
    }
    const startDate = new Date(concert.start_time)
    if (subtractMinutesFromDate(startDate, 240) == filter) {
      // Add concerts that start up until 4 o'clock in the night to the
      // previous day
      filteredList[i] = concert
    }
  }
  return filteredList
}

const filters = {
  'All': 'All',
  'Jun 26': '2016-06-26',
  'Jun 27': '2016-06-27',
  'Jun 28': '2016-06-28',
  'Jun 29': '2016-06-29',
  'Jun 30': '2016-06-30',
  'Jul 1': '2016-07-01',
  'Jul 2': '2016-07-02',
}

const activeFilter = setActiveFilter(filters, '2016-06-26')

const initialState = {
  updatingConcerts: false,
  activeFilter: activeFilter,
  filters: filters,
  filteredConcerts: filterConcerts(activeFilter, concertsInitialData),
  concerts: concertsInitialData
}

export function concerts(state = initialState, action) {
  switch (action.type) {
  case UPDATING_CONCERT_LIST:
    return {
      ...state,
      updatingConcerts: true
    }
  case UPDATED_CONCERT_LIST:
    return {
      ...state,
      updatingConcerts: false,
      filteredConcerts: filterConcerts(state.activeFilter, action.concerts),
      concerts: action.concerts
    }
  case SET_CONCERT_FILTER:
    return {
      ...state,
      activeFilter: action.filter,
      filteredConcerts: filterConcerts(action.filter, state.concerts)
    }
  default:
    return state
  }
}
