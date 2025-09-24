import { FinishConsultWithPrescription } from "../api/endpoints/finishConsultWithPrescription.api";

export async function FinishConsultWithPrescriptionService(data:any) {
    try {
        const response = await FinishConsultWithPrescription(data);
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