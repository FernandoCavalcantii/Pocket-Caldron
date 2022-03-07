export const SAVE_LOGIN = 'SAVE_LOGIN';

const saveLogin = (name, password) => ({
  type: SAVE_LOGIN,
  name,
  password,
});

export default saveLogin;
