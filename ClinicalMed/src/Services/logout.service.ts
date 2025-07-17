import {logout} from '../api/endpoints/logout.api'
export async function Logout() {
    try {
        await logout();
        localStorage.clear();
    } catch (error) {
        console.error('Erro ao fazer logout', error);
    }
}