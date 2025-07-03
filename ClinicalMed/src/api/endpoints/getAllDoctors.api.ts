import api from '../axios.config';

export const getAllDoctors = ()=>{
    return api.get("doctor");
}
