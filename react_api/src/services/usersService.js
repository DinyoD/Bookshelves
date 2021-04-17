const serverUrl = 'http://localhost:5000/api/v1/users';

const userService = {

    getOne: async(id)=> {
        try {
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
            
        } catch (error) {
            throw error;
        }

    },

    addBookToOwnedList: async(book, user)=> {

        try {
            let currentUrl = serverUrl + '/' + user._id;
    
            const res = await fetch(
                currentUrl,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                    body: JSON.stringify({...user, ownedBooks: [ ...user.ownedBooks, book]})
                }
            )
            
            return await res.json();
            
        } catch (error) {
            throw error;
        }
    },

    addBookToWishList: async(book, user) => {

        try {
            let currentUrl = serverUrl + '/' + user._id;
    
            const res = await fetch(
                currentUrl,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                    body: JSON.stringify({...user, wishList: [ ...user.wishList, book]})
                }
            )
    
            return await res.json();
            
        } catch (error) {
            throw error;
        }
    },

    removeBookFromWishedList: async(book, user) => {
        try {
            console.log(user);
            let currentUrl = serverUrl + '/' + user._id;
            const res = await fetch(
                currentUrl,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                    body: JSON.stringify( {...user, wishList: [...user.wishList.filter(x=> x._id !== book._id && x !== book._id)] } )
                }
            )
            return await res.json();
             
        } catch (error) {
            throw error;
        }
    },

    removeBookFromOwnedList: async(book, user) => {

        try {
            let currentUrl = serverUrl + '/' + user._id;
            const res = await fetch(
                currentUrl,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                    body: JSON.stringify({...user, ownedBooks: [...user.ownedBooks.filter(x=> x._id !== book._id)]})
                }
            )
    
            return await res.json();
            
        } catch (error) {
            throw error;
        }
    },

    addComment: async(user, comment) => {
        try {
            let currentUrl = serverUrl + '/' + user._id;
    
            const res = await fetch(
                currentUrl,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                    body: JSON.stringify({...user, comments: [ ...user.comments, comment]})
                }
            )
    
            return await res.json();
            
        } catch (error) {
            throw error;
        }
    }

} 

export default userService;