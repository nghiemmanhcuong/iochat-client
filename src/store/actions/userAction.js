import * as userApi from '../../api/userApi.js';

export const updateUser = (id,userData) => async (dispatch) => {
    dispatch({type: 'UPDATE_START'})
    try {
        const {data} = await userApi.updateUser(id,userData);  
        dispatch({type: 'UPDATE_SUCCESS',data:data});
    } catch (error) {
        console.log(error);
        dispatch({type: 'UPDATE_FAIL'})
    }
}

export const followUser = (id,currentUserId) => async(dispatch) => {
    dispatch({type: 'FOLLOW_USER',data:id});
    await userApi.followUser(id,currentUserId);
}

export const unfollowUser = (id,currentUserId) => async(dispatch) => {
    dispatch({type: 'UNFOLLOW_USER',data:id});
    await userApi.unfollowUser(id,currentUserId);
}