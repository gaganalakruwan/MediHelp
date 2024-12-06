import {
    START_LOADING,
    END_LOADING,
    SET_SPINNER_MESSAGE,
} from "constant/reduxConstants";


export const startLoading = () => ({
    type: START_LOADING,
});

export const endLoading = () => ({
    type: END_LOADING,
});

export const setMessage = (message: any) => ({
    type: SET_SPINNER_MESSAGE,
    payload: message,
});


