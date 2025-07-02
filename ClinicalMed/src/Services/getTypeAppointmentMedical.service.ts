import { getTypeAppointment } from "../api/endpoints/getTypeAppointmentMedical.api";

export async function getTypeAppointmentService(){
    try {
        const response = await getTypeAppointment();
        return response.data;
    } catch (error:any) {
        if (error.response?.status === 400) {
            throw new Error(error.response.data || 'Não foi possível recuparar as informações do tipo de consulta médica');
        } else {
            console.error('Erro inesperado ao buscar tipos de consulta:', error);
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }
}