import api from '../axios.config';

export const updatePatient = (id:number, payload:any)=>{
    return api.put(`/patient/${id}`,payload);
}