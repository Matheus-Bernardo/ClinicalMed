import {updatePatient} from "../api/endpoints/updatePatient.api"

export async function updatePatientService(id:number,payload:any) {
    try {
        const response = await updatePatient(id,payload);
        return response.data;
    } catch (error:any) {
        if (error.response?.status === 400) {
            throw new Error(error.response.data || 'Seu usuário não foi encontrado!');
        } else {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }
}