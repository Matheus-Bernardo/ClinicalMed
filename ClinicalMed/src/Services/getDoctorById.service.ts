import {getDoctorById} from '../api/endpoints/getDoctorById.api'

export async function getDoctorByIdService(id:number) {
    
    try {
        const response = await getDoctorById(id);
        return response.data;
    } catch (error:any) {
        if (error.response?.status === 400) {
            throw new Error(error.response.data || 'Os seus dados não foram encontrados!');
        } else {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }


}