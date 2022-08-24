import axios from 'axios';

const API = axios.create({baseURL: 'https://whispering-thicket-54797.herokuapp.com'});

export const getTimeLinePosts = (id) => API.get(`/post/timeline/${id}`);
export const likePost = (postId,userId) => API.put(`/post/like/${postId}`, {userId: userId});