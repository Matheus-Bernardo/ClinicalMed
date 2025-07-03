import { getPatients } from "../api/endpoints/getPatients.api";

export async function getPatientsService() {
    try {
        const response = await getPatients();
        return response.data;
    } catch (error:any) {
        if (error.response?.status === 400) {
            throw new Error(error.response.data || 'Não foi possível recuparar a lista de pacientes');
        } else {
            console.error('Erro inesperado ao buscar a lista de pacientes:', error);
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }
}