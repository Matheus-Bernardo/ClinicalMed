import { login } from '../api/endpoints/login.api';

export async function loginUser(email: string, password: string, typeUser: number) {
    try {
        const response = await login({ email, password, typeUser });
        localStorage.setItem('name', response.data.firstName)
        localStorage.setItem('id', response.data.id)
        localStorage.setItem('role', response.data.role)
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 400) {
            throw {
                status: error.response?.status,
                message: error.response?.data?.message || 'Dados inválidos.'
            };
        } else {
            console.error('Erro inesperado:', error);
            throw new Error('Erro inesperado. Tente novamente mais tarde.');
        }

    }
}