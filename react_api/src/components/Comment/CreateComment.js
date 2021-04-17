import { useContext, useState } from 'react';
import { BiError } from 'react-icons/bi';

import commentsService from '../../services/commentsService';
import booksService from '../../services/booksService';
import userService from '../../services/usersService';
import userContext from '../Contexts/UserContext';

const CreateComment = ({book, addComment}) => {
    
    const[user, setUser] = useContext(userContext);
    const [error, setError] = useState(null)

    const submitCommentHadler = async(e) => {
        e.preventDefault();
        setError(null)

        if (e.target.comment.value !== '' && e.target.comment.value.trim() !== '') {
            
            let comment ={
                user: user.username,
                bookInfo: `${book.title} (${book.author.name})`,
                text:  e.target.comment.value
            }
            
            try {
                let createdComment = await commentsService.create(comment);
                await booksService.addComment(book, createdComment);
                await userService.addComment(user, createdComment)
                setUser(prev => ({...prev, comments: [...prev.comments, createdComment]}))
                e.target.comment.value= '';
                addComment(createdComment)               
            } catch (err) {
                setError('Server - Sorry, something went wrong there. Please, try again...')
            }
    
        }

    }

   return (
        <form className='form' onSubmit={submitCommentHadler}>
            {error ? <div className='form-error'><BiError className='form-error-icon'/>{error}</div> : ''}
            <label htmlFor="comment">
                write your comment:
                <input className='btn' type="submit" value="Submit"/>
            </label>
            <br/>
            <textarea name="comment" id="comment" cols="100" rows="5"></textarea>
            <br/>
        </form>
    )   
}

export default CreateComment;