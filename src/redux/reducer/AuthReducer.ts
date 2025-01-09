import {LOGOUT, SET_TOKEN, SET_USER_DATA, SET_USER_ID} from '../../constant/reduxConstants';

const initialState = {
  access_token: '',
  userName: '',
  userId:''
};

function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        userName: action.payload,
      };
    case SET_TOKEN:
      return {
        ...state,
        access_token: action.payload,
      };
    case SET_USER_ID:
      return {
        ...state,
        userId: action.payload,
      };
    case LOGOUT:
      return {
        ...initialState,
      };

    default:
      return state;
  }
}

export default authReducer;
