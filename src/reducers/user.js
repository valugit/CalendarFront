const initState = {
  isAuthenticated: false,
  id: -1,
  username: '',
  email: '',
  role: ''
}

export default (state = initState, action = {}) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        id: action.id,
        username: action.username,
        email: action.email,
        role: action.role,
      };
    case 'LOGOUT':
      return initState;
    default:
      return state;
  }
}