import { LOGIN, PUSH_DATA, SET_USER_ID } from './actions';

const initialState = {
  isLogin: false,
  userId: null,
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
    case PUSH_DATA: {
      return {
        ...state,
        datas: [...state.datas, action.payload.data]
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;
