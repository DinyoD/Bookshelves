
import CommentCard from './CommentCard';

const BookCommenst = ({comments})=> {
    
    
    return (
        <div className="book-comments-container">
            {comments
                .map(x => (<CommentCard key={x._id} comment={x}/>))}
        </div>
    )
};


export default BookCommenst;