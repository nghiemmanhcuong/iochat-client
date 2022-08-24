import axios from 'axios';

const API  = axios.create({baseURL: 'https://whispering-thicket-54797.herokuapp.com'});

export const login = (formData) => API.post('/auth/login',formData);
export const signUp = (formData) => API.post('/auth/register',formData);
