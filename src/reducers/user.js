const initState = {
  name: 'Grégoire'
}

export default (state = initState, action = {}) => {
  switch (action.type) {
    case action.type === 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      }

    default:
      return state;
  }
}