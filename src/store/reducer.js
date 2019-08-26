import { CLEAR_MESSAGE, LOGIN, PUSH_DATA, SET_USER_ID, SET_USER_IMAGE, SET_USER_NAME } from './actions';

const initialState = {
  isLogin: false,
  userId: null,
  image: null,
  name: '',
  datas: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLogin: true
      };
    }
    case SET_USER_ID: {
      return {
        ...state,
        userId: action.payload.userId
      };
    }
    case SET_USER_IMAGE: {
      return {
        ...state,
        image: action.payload.image
      };
    }
    case SET_USER_NAME: {
      return {
        ...state,
        name: action.payload.name
      };
    }
    case PUSH_DATA: {
      return {
        ...state,
        datas: [...state.datas, action.payload.data]
      };
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        datas: []
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
