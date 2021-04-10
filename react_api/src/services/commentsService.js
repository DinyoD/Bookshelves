const serverUrl = 'http://localhost:5000/api/v1/comments';

const commentsServise =  {
    
    create: async(comment) => {
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
    }
}

export default commentsServise;