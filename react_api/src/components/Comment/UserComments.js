import {useContext, useEffect, useState} from 'react';

import Comments from '../Comment/Comments';
import NoContent from '../Shared/NoContent';

import commentsServise from '../../services/commentsService';

import userContext from '../Contexts/UserContext';

const UserComments = () => {

    const [user, setUser] = useContext(userContext);
    const [comments, setComments] = useState([]);

    useEffect(() => {

        setComments(user.comments)
    },[user]);


    const DeleteComment= (id) => {
        commentsServise.delete(id)
        .then(() => {

            setUser(prev => ({...prev, comments:[...prev.comments.filter(x => x._id !== id)]}))
        })
    }
    const EditComment = (comment) => {
        console.log(comment);
    }

    return (
        <div className='container'>
            {comments.length
                ? (<Comments 
                    comments={comments} 
                    user={true} 
                    clickDel={(id) => DeleteComment(id)} 
                    clickEdit={(comment) => EditComment(comment)}

                />)
                : <NoContent text='No Comments!'/>
            }
        </div>
    )
}

export default UserComments;