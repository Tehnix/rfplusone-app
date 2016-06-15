const initialState = {
  scene: {},
}

export function routes(state = initialState, action = {}) {
  switch (action.type) {
  case 'focus':
    return {
      ...state,
      scene: action.scene,
    }
  default:
    return state
  }
}
