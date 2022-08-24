import * as postApi from '../../api/postApi.js';

export const getTimeLinePosts = (id) => async (dispatch) => {
    dispatch({type:'RETREIVING_START'})
    try {
        const {data} = await postApi.getTimeLinePosts(id);
        dispatch({type:'RETREIVING_SUCCESS',data:data.posts});
    } catch (error) {
        console.log(error);
        dispatch({type:'RETREIVING_FAIL'})
    }
}