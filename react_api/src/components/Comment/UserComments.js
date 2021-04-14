import {useContext, useEffect, useState} from 'react';

import Comments from '../Comment/Comments';

import commentsServise from '../../services/commentsService';

import userContext from '../Contexts/UserContext';

const UserComments = () => {

    const [user] = useContext(userContext);
    const [comments, setComments] = useState([]);

    useEffect(() => {

        setComments(user.comments)

    },[])

    const DeleteComment= (id) => {
        commentsServise.delete(id)
        .then(() => {
            setComments(prev => ([...prev.filter(x => x._id !== id)]))
        })
    }
    const EditComment = (comment) => {
        console.log(comment);
    }

    return (
        <div className='container'>
            <Comments 
                comments={comments} 
                user={true} 
                clickDel={(id) => DeleteComment(id)} 
                clickEdit={(comment) => EditComment(comment)}

            />
        </div>
    )
}

export default UserComments;