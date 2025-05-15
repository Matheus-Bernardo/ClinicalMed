import {getPatientById} from '../api/endpoints/getPatientById.api'

export async function getPatientByIdService(id:number) {
    
    try {
        const response = await getPatientById(id);
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