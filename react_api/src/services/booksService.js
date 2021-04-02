const serverUrl = 'http://localhost:5000/api/v1/books';

const bookService = {
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
    create: async(book) => {
        const res = await fetch(
            serverUrl,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'                       
                },
                body: JSON.stringify(book)
            }
        )

        return await res.json();
    }

}

export default bookService;