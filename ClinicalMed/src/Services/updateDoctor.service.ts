import {updateDoctor} from "../api/endpoints/updateDoctor.api"

export async function updateDoctorService(id:number,payload:any) {
    try {
        const response = await updateDoctor(id,payload);
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