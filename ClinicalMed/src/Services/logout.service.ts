export async function Logout() {
    try {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
    } catch (error) {
        console.error('Erro ao fazer logout',error);
    }
}