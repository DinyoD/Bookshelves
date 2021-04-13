const BookCard = ({id, title, coverUrl, author, genre, year, clicked}) => {


    return (
        <div className='book-container' onClick={() => clicked(id)}>
            <div className='book-cover'>
                <img className='book-cover-img' src={coverUrl} alt=""/>
            </div>
            <div className='book-info'>
                <p className='book-info-item title'>{title}</p>
                <p className='book-info-item autnorName'>{author}</p>
                <p className='book-info-item year'>{year}</p>
                <p className='book-info-item genre'>{genre}</p>
            </div>
        </div>
    )
}

export default BookCard;