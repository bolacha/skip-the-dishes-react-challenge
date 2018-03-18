const user = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN':
      return Object.assign(state, action.token);
    case 'LOGOUT':
      return Object.assign(state, { token : null });
    default:
      return state
  }
}

export default user
