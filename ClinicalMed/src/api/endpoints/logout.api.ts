import api from '../axios.config';

export const logout = () =>
    api.post('/logout')