import api from '../axios.config';

export const getConsultByUser = (id: number) => {
    return api.get(`/ConsultationMedical/${id}`);
};
