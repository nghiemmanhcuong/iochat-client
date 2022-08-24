import * as authApi from '../../api/authApi.js';

export const login = (formData) => async (dispatch) => {
    dispatch({type: 'AUTH_START'});
    try {
        const {data} = await authApi.login(formData);
        dispatch({type: 'AUTH_SUCCESS', data: data});
    } catch (error) {
        dispatch({type: 'AUTH_FAIL',payload: error.response.data.message});
    }
};

export const signUp = (formData) => async (dispatch) => {
    dispatch({type: 'AUTH_START'});
    try {
        const {data} = await authApi.signUp(formData);
        dispatch({type: 'AUTH_SUCCESS', data: data});
    } catch (error) {
        dispatch({type: 'AUTH_FAIL',payload: error.response.data.message});
    }
};

export const logout = () => async (dispatch) => {
    dispatch({type: 'LOG_OUT'});
};
