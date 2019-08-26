export const PUSH_DATA = 'PUSH_MESSAGE';
export const LOGIN = 'LOGIN';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_USER_IMAGE = 'SET_USER_IMAGE';
export const MESSAGE_TYPE = 'MESSAGE_TYPE';
export const PRESENCE_TYPE = 'PRESENCE_TYPE';
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE';

export const login = () => ({
  type: LOGIN
});

export const setUserId = userId => ({
  type: SET_USER_ID,
  payload: {
    userId
  }
});

export const setUserImage = image => ({
  type: SET_USER_IMAGE,
  payload: {
    image
  }
});

export const setUserName = name => ({
  type: SET_USER_NAME,
  payload: {
    name
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

export const clearMessage = () => ({
  type: CLEAR_MESSAGE
});
