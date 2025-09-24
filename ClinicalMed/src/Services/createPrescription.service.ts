import {CreatePrescription} from '../api/endpoints/createPrescription.api';
import { ICreatePrescription } from '../Intefaces/Prescription/CreatePrescription';

export async function CreatePrescriptionService(dataPrescriptionCreate: ICreatePrescription) {
    try {
        const response = await CreatePrescription(dataPrescriptionCreate);
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