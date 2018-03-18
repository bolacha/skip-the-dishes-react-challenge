
export const login = token => ({
  type: 'LOGIN',
  token: token
});

export const logout = token => ({
  type: 'LOGOUT',
  token: null
});
 
