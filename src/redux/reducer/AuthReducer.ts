import {LOGOUT, SET_USER_DATA} from '../../constant/reduxConstants';

const initialState = {
  authData: {
    access_token: ''
  },
};

function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        authData: action.payload,
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
