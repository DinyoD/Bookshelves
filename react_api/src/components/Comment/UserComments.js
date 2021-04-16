import {useContext, useEffect, useState} from 'react';

import Comments from '../Comment/Comments';
import NoContent from '../Shared/NoContent';
import Button from '../Shared/Button';

import commentsServise from '../../services/commentsService';

import userContext from '../Contexts/UserContext';

const UserComments = () => {

    const [user, setUser] = useContext(userContext);
    const [comments, setComments] = useState([]);
    const [editing, setEditing] = useState(false);
    const [commentForEdit, setCommentForEdit] = useState({});

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
        setEditing(true);
        setCommentForEdit(comment);
    }

    const ChangeTextHandler =(e) => {
        setCommentForEdit(prev => ({...prev, text: e.target.value }))
    }

    const CancelEditingHandler = () => {
        setEditing(false)
    } 

    const EditHandler = (e) => {


        setEditing(false)
    } 
 

    return (
        <>
            {editing ? (
                <div className='edit-comment-container'>
                    <textarea className='edit-comment' name='text' onChange={ChangeTextHandler}>{commentForEdit.text}</textarea>
                    <div className='edit-comment-btns'>
                        <Button color='darkred' text='Cancel' click={CancelEditingHandler}/>
                        <Button  color='olivedrab' text='Save' click={EditHandler}/>
                    </div>
                </div>
            ) : ''}
            {comments.length
                ? (<Comments 
                    comments={comments} 
                    user={true} 
                    clickDel={(id) => DeleteComment(id)} 
                    clickEdit={(comment) => EditComment(comment)}

                />)
                : <NoContent text='No Comments!'/>
            }
        </>
    )
}

export default UserComments;