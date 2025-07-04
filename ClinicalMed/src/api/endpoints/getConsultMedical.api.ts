import api from '../axios.config';

export const getConsultsMedical = ()=>{
    return api.get("ConsultationMedical");
}
