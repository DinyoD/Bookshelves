import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const CommentCard = ({comment, book, user, clickDel, clickEdit}) => {
    return (
         
        <blockquote className={user ? 'comment-card large' : 'comment-card'}>
            <p className="comment-card-text">{comment.text}</p>
            <span className="comment-card-name">{user ? `${comment.bookInfo} - ` : ''}{comment.date} {book ? `- ${comment.user}` : ``}</span>
            {user ? (<div>
                        <AiOutlineDelete className='comment-card-btn del' onClick={()=>clickDel(comment._id)}/>
                        <AiOutlineEdit className='comment-card-btn edit' onClick={() => clickEdit(comment)}/>
                    </div>) : ''}
        </blockquote>
    )
};

export default CommentCard;