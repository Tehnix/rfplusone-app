export const UPDATED_CHAT_LIST = 'UPDATED_CHAT_LIST'

export const CHAT_TYPES = {
  SINGLE_CHAT: 'SINGLE_CHAT',
  GROUP_CHAT: 'GROUP_CHAT'
}

export function updateChatList(chats) {
  return {
    type: UPDATED_CHAT_LIST,
    chats: chats
  }
}
