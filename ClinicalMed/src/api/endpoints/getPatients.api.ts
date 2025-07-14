import api from '../axios.config';

export const getPatients = ()=>{
    return api.get("patient");
}