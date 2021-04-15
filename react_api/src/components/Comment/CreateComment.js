import { useContext } from 'react';

import commentsService from '../../services/commentsService';
import booksService from '../../services/booksService';
import userService from '../../services/usersService';

import userContext from '../Contexts/UserContext';

const CreateComment = ({book, addComment}) => {
    
    const[user, setUser] = useContext(userContext);

    const submitCommentHadler = async(e) => {
        e.preventDefault();

        let comment ={
            user: user.username,
            bookInfo: `${book.title} (${book.author.name})`,
            text:  e.target.comment.value
        }

        let createdComment = await commentsService.create(comment);
        await booksService.addComment(book, createdComment);
        await userService.addComment(user, createdComment)
        setUser(prev => ({...prev, comments: [...prev.comments, createdComment]}))
        e.target.comment.value= '';
        // history.push(`/books/${book._id}/comments`);
        addComment(createdComment)
    }

   return (
    <form className='form' onSubmit={submitCommentHadler}>
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