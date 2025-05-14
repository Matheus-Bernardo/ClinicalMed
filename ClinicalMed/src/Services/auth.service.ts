import { login } from '../api/endpoints/auth.api';

export async function loginUser(email: string, password: string, typeUser: number) {
    try {
        const response = await login({ email, password, typeUser });
        localStorage.setItem('name',response.data.firstName)
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