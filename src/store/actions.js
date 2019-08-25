export const PUSH_DATA = 'PUSH_MESSAGE';
export const LOGIN = 'LOGIN';
export const SET_USER_ID = 'SET_USER_ID';
export const MESSAGE_TYPE = 'MESSAGE_TYPE';
export const PRESENCE_TYPE = 'PRESENCE_TYPE';

export const login = () => ({
  type: LOGIN
});

export const setUserId = userId => ({
  type: SET_USER_ID,
  payload: {
    userId
  }
});

export const pushMessage = message => ({
  type: PUSH_DATA,
  payload: {
    data: {
      type: MESSAGE_TYPE,
      timestamp: message.updatedAt,
      message
    }
  }
});

export const pushPresence = user => ({
  type: PUSH_DATA,
  payload: {
    data: {
      type: PRESENCE_TYPE,
      timestamp: user.updatedAt,
      user
    }
  }
});
