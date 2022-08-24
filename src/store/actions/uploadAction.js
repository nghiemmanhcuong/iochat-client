import * as uploadApi from '../../api/uploadApi.js';

export const uploadImage = (data) => async (dispatch) => {
    try {
        await uploadApi.uploadImageApi(data);
    } catch (error) {
        console.log(error);
    }
};

export const uploadPost = (data) => async (dispatch) => {
    dispatch({type: 'UPLOAD_START'});
    try {
        const newPost = await uploadApi.uploadPostApi(data);
        dispatch({type: 'UPLOAD_SUCCESS',data: newPost.data.post});
    } catch (error) {
        console.log(error);
        dispatch({type: 'UPLOAD_FAIL'});
    }
};
