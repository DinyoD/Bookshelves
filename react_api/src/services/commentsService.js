const serverUrl = 'http://localhost:5000/api/v1/comments';

const commentsServise =  {
    
    create: async(comment) => {
        try {
            const res = await fetch(
                serverUrl,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                    body: JSON.stringify(comment)
                }
            )
    
            return await res.json();
            
        } catch (error) {
            console.log(error);
        }
    },
    edit:  async(id, comment) =>  {
        try {
            let url = serverUrl + '/' +id
            const res = await fetch(
                url,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                    body: JSON.stringify(comment)
                }
            )
    
            return await res.json();
            
        } catch (error) {
            console.log(error);
        }
    },
    delete: async(id) => {
        try {
            let url = serverUrl + '/' +id
            const res = await fetch(
                url,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'                       
                    },
                }
            )
    
            return await res.json();
            
        } catch (error) {
            console.log(error);
        }
    }
}

export default commentsServise;