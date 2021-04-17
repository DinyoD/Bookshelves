const serverUrl = 'http://localhost:5000/api/v1/books';

const bookService = {
    
    getAll: async() => {
        try {
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
        } catch (error) {
            throw error;
        }

    },

    create: async(book) => {
        try {
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
            
        } catch (error) {
            throw error;
        }
    },

    getOne: async(id) => {
        try {           
            let currentUrl = serverUrl +"/"+id;
            const res = await fetch(
                currentUrl,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'                       
                    }
                }
            )    
            return await res.json();
        } catch (error) {
            throw error;
        }
    },

    addComment: async(book, comment) => {
        try {
            let currentUrl = serverUrl + '/' + book._id;
    
            const res = await fetch(
                currentUrl,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                    body: JSON.stringify({...book, comments: [ ...book.comments, comment]})
                }
            )
            let b = await res.json();
            console.log(`addComment - ${b}`);
            return b
            
        } catch (error) {
            throw error;
        }
    },

    edit: async(book) => {
        try {
            let currentUrl = serverUrl + '/' + book._id;
    
            const res = await fetch(
                currentUrl,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                    body: JSON.stringify({...book})
                }
            )
            let b = await res.json();
            console.log(`addComment - ${b}`);
            return b
            
        } catch (error) {
            throw error;
        }
    }
}

export default bookService;