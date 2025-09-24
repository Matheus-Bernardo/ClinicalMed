import {getConsultByUser} from '../api/endpoints/getConsultByUser.api'

export async function getConsultByUserService(id:number) {
    
    try {
        const response = await getConsultByUser(id);
        return response.data;
    } catch (error:any) {
        if (error.response?.status === 400) {
            throw new Error(error.response.data || 'Os seus dados não foram encontrados!');
        } else {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }
    }


}