import { getConsultsMedical } from "../api/endpoints/getConsultMedical.api";

export async function getConsultsMedicalService() {
    try {
        const response = await getConsultsMedical();
        return response.data;
    } catch (error:any) {
        if (error.response?.status === 400) {
            throw new Error(error.response.data || 'Não foi possível recuparar a lista de consultas');
        } else {
            console.error('Erro inesperado ao buscar a lista de consultas:', error);
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }
}