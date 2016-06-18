export const hostname = 'http://127.0.0.1:3000'

export const ENDPOINTS = {
  exchangeTokenToSession: hostname + '/session',
  concerts: hostname + '/concerts',
  concert: (concertId) => {
    return hostname + '/concerts/' + concertId.toString()
  },
  people: hostname + '/people',
  chats: hostname + '/chats',
  chat: (chatId) => {
    return hostname + '/chats/' + chatId.toString()
  },
}
