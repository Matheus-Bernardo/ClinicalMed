import { CreateConsultMedical } from "../api/endpoints/createConsultMedical.api";

export async function CreateConsultMedicalService(data:any) {
    try {
        const response = await CreateConsultMedical(data);
         return response.data;
    } catch (error: any) {
        if (error.response?.status === 400) {
            throw new Error(error.response.data || 'Dados inválidos.');
        } else {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }

    }
}