import api from '../axios.config';

export const CreateConsultMedical = (data:any) =>
    api.post('/ConsultationMedical',data)