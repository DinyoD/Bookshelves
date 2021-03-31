const serverUrl = 'http://localhost:5000/api/v1/authors';

const authorsService = {
    getAll: async() => {

        const res = await fetch(
            serverUrl,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'                       
                }
            }
        )

        return await res.json();
    },
    create: async(name) => {
        const res = await fetch(
            serverUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                       
                },
                body: JSON.stringify({ name: name})
            }
        )

        return await res.json();
    }

}

export default authorsService;