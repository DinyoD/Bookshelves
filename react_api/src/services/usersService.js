const serverUrl = 'http://localhost:5000/api/v1/users';

const userService = {

    getOne: async(id)=> {
        let currentUrl = serverUrl + '/' +id;

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

    },
    
    addBookToOwnedList: (bookId)=> {

    }
} 

export default userService;