import { getAllDoctors } from "../api/endpoints/getAllDoctors.api";

export async function getDoctorsService() {
    try {
        const response = await getAllDoctors();
        return response.data;
    } catch (error:any) {
        if (error.response?.status === 400) {
            throw new Error(error.response.data || 'Não foi possível recuparar a lista de médicos');
        } else {
            console.error('Erro inesperado ao buscar a lista de médicos:', error);
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }
}