import api from '../axios.config';

export const login = (credentials:{email: string;password:string;typeUser: number}) =>
    api.post('/login',credentials)