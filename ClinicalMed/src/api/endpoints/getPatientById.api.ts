import api from '../axios.config';

export const getPatientById = (id: number) => {
    return api.get(`/patient/${id}`);
};
