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
        if (user) {
            
            setComments(user.comments)
        }
    },[user]);


    const DeleteComment= (id) => {
        commentsServise.delete(id)
        .then(() => {

            setUser(prev => ({...prev, comments:[...prev.comments.filter(x => x._id !== id)]}))
        })
    }
    const EditComment = (id) => {
        setEditing(true);
        let currComment = comments.find(x=>x._id === id);
        if (currComment) {
            
            setCommentForEdit(currComment);
        }
    }

    const ChangeTextHandler =(e) => {
        if (e.target.value !== '' && e.target.value.trim() !== '') {
            
            setCommentForEdit(prev => ({...prev, text: `${e.target.value} (edited)` }))
        }
    }

    const CancelEditingHandler = () => {
        setEditing(false)
    } 

    const SubmitEditHandler = () => {

        commentsServise.edit(commentForEdit._id, commentForEdit)
        .then( c => {
            console.log(c);
            setUser(prev => ({...prev, comments: [...prev.comments.filter(x=>x._id !== commentForEdit._id), c]}))
            setComments(prev => ([...prev.filter(x=>x._id !== commentForEdit._id), c]));
            setCommentForEdit({});
            setEditing(false);
        })
    } 
 

    return (
        <>
            {editing ? (
                <div className='edit-comment-container'>
                    <textarea className='edit-comment' name='text' onChange={ChangeTextHandler}>{commentForEdit.text}</textarea>
                    <div className='edit-comment-btns'>
                        <Button color='darkred' text='Cancel' click={CancelEditingHandler}/>
                        <Button  color='olivedrab' text='Save' click={SubmitEditHandler}/>
                    </div>
                </div>
            ) : ''}
            {comments.length
                ? (<Comments 
                    comments={comments} 
                    user={true} 
                    clickDel={(id) => DeleteComment(id)} 
                    clickEdit={(id) => EditComment(id)}

                />)
                : <NoContent text='No Comments!'/>
            }
        </>
    )
}

export default UserComments;