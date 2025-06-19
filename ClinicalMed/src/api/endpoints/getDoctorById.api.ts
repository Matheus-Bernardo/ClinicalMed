import api from '../axios.config';

export const getDoctorById = (id: number) => {
    return api.get(`/doctor/${id}`);
};
