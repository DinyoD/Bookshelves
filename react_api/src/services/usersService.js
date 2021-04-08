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

    addBookToOwnedList: async(bookId, user)=> {
        let currentUrl = serverUrl + '/' + user._id;

        const res = await fetch(
            currentUrl,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'                       
                },
                body: JSON.stringify({...user, ownedBooks: [ ...user.ownedBooks, bookId]})
            }
        )

        return await res.json();
    },
    addBookToWishList : async(bookId, user) => {
        let currentUrl = serverUrl + '/' + user._id;

        const res = await fetch(
            currentUrl,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'                       
                },
                body: JSON.stringify({...user, wishList: [ ...user.wishList, bookId]})
            }
        )

        return await res.json();
    },

    removeBookFromWishedList: async(bookId, user) => {
        let currentUrl = serverUrl + '/' + user._id;
        const res = await fetch(
            currentUrl,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'                       
                },
                body: JSON.stringify({...user, wishList: [...user.wishList.filter(x=> x._id !== bookId && x !== bookId )]})
            }
        )

        return await res.json();
    },

    removeBookFromOwnedList: async(bookId, user) => {
        let currentUrl = serverUrl + '/' + user._id;
        const res = await fetch(
            currentUrl,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'                       
                },
                body: JSON.stringify({...user, ownedBooks: [...user.ownedBooks.filter(x=> x._id !== bookId && x !== bookId)]})
            }
        )

        return await res.json();
    }

} 

export default userService;