const CommentCard = ({comment}) => {
    return (
        <blockquote className="comment-card">
            <p className="comment-card-text">{comment.text}</p>
            <span className="comment-card-name">{comment.date} - Pesho</span>
        </blockquote>
    )
};

export default CommentCard;