import { RegisterPatient } from '../api/endpoints/registerPatient.api';
import { ICreatePatient } from '../Intefaces/Patient/PatientRegister'


export async function CreatePatient(dataPatientCreate: ICreatePatient) {

    try {
        const response = await RegisterPatient(dataPatientCreate);
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