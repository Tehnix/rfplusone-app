export const UPDATE_PEOPLE_LIST = 'UPDATE_PEOPLE_LIST'

export function updatePeopleList(people) {
  return {
    type: UPDATE_PEOPLE_LIST,
    people: people
  }
}
