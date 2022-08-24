import axios from 'axios';

const API  = axios.create({baseURL: 'https://whispering-thicket-54797.herokuapp.com'});

export const uploadImageApi = (data) => API.post('/upload/', data);
export const uploadPostApi = (data) => API.post('/post/create', data);
