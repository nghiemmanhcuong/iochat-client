import axios from 'axios';

const API = axios.create({baseURL: 'https://whispering-thicket-54797.herokuapp.com'});

export const getUserById = (id) => API.get(`/user/by-id/${id}`);
export const updateUser = (id, userData) => API.put(`/user/update/${id}`, userData);
export const getAllUser = () => API.get('/user/all');
export const followUser = (id,currentUserId) => API.put(`/user/follow/${id}`, {currentUserId:currentUserId});
export const unfollowUser = (id,currentUserId) => API.put(`/user/unfollow/${id}`, {currentUserId:currentUserId});