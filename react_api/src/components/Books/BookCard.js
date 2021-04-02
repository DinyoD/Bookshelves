const BookCard = ({title, imageUrl, author, genre}) => {
    return (
        <div>
            <div>
                <img src={imageUrl} alt=""/>
            </div>
            <div>
                <p>{title}</p>
                <p>{genre}</p>
                <p>{author?.name}</p>
            </div>
        </div>
    )
}

export default BookCard;