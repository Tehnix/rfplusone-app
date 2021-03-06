export const hostname = 'http://api.rfplusone.dk'

export const ENDPOINTS = {
  exchangeTokenToSession: hostname + '/auth',
  concerts: hostname + '/concerts',
  concert: (concertId) => {
    return hostname + '/concerts/' + concertId.toString()
  },
  attending: (concertId) => {
    return hostname + '/concerts/' + concertId.toString()
  },
  individual: (concertId) => {
    return hostname + '/concerts/' + concertId.toString() + '/look_for_individual'
  },
  group: (concertId) => {
    return hostname + '/concerts/' + concertId.toString() + '/look_for_group'
  },
  like: (concertId, profileId) => {
    return hostname + '/concerts/' + concertId.toString() + '/like/' + profileId.toString()
  },
  chats: hostname + '/chats',
  chat: (chatId) => {
    return hostname + '/chats/' + chatId.toString()
  },
  message: (chatId) => {
    return hostname + '/chats/' + chatId.toString() + '/messages'
  },
}
