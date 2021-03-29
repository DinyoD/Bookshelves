const serverUrl = 'http://localhost:5000/api/v1/auth';

const authService = {
    register: async (user) => {
        let url = serverUrl + '/register'
        const res = await fetch(
            url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                       
                },
                body: JSON.stringify(user)
            }
        );
        return await res.json()
    },
    
    login: async(user) => {
        let url = serverUrl + '/login'
        const res = await fetch(
            url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                       
                },
                body: JSON.stringify(user)
            }
        );
        return await res.json()
    }
}

export default authService;