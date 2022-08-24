import axios from 'axios';

const API = axios.create({baseURL: 'https://whispering-thicket-54797.herokuapp.com'});

export const getUserChats = (userId) => API.get('/chat/' + userId);
export const createChat = (senderId,receicerId) => API.post('/chat/',{senderId,receicerId});
