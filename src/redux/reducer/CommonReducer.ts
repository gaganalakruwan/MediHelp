import {
    START_LOADING,
    END_LOADING,
    SET_SPINNER_MESSAGE,
} from '../../constant/reduxConstants';
import { commonState } from '../../type';


const initialState: commonState = {
    loading: false,
    spinnerMessage: 'Loading....',
};


function commonReducer(state = initialState, action: any) {
    switch (action.type) {
        case START_LOADING:
            return {
                ...state,
                loading: true,
            };
        case END_LOADING:
            return {
                ...state,
                loading: false,
            };
        case SET_SPINNER_MESSAGE:
            return {
                ...state,
                spinnerMessage: action.payload,
            };


        default:
            return state;
    }
}


export default commonReducer;



