import axios from 'axios';

const API = axios.create({baseURL: 'https://whispering-thicket-54797.herokuapp.com'});

export const getMessages = (chatId) => API.get(`/message/${chatId}`);
export const sendMessage = (message) => API.post('/message', message);
