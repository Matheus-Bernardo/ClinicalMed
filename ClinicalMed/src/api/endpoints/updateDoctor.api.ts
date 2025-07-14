import api from '../axios.config';

export const updateDoctor = (id:number, payload:any)=>{
    return api.put(`/doctor/${id}`,payload);
}