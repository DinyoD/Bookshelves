import { useState, useEffect} from 'react';
import { Link } from 'react-router-dom'

const BookDetails = ({match}) => {
    return (
        <div className='book-details-container'>

            <div className='book-details-aside'>
                <div className='book-details-cover'>
                    <img className='image'src="https://i.pinimg.com/originals/08/a5/d6/08a5d6f4bce7fc216214704d67ac5e23.jpg" alt=""/>
                </div>
                <div className="book-details-actions">                  
                    {/* <Link className='action-link' to='#'>Readed</Link> */}
                    <Link className='action-link' to='#'>Add to owned list</Link>
                    <Link className='action-link' to='#'>Remove from owned list</Link>
                    <Link className='action-link' to='#'>Add to wish list</Link>
                    <Link className='action-link' to='#'>Remove from wish list</Link>
                </div>
            </div>

            <div className="book-details-main">
                <h1 className="details-title">Outlander</h1>
                <div className="details-rating"></div>
                <h3 className="details-author">By: Diana Cabaldon</h3>
                <p className="details-description">
                    The Outlander series focuses on 20th-century British nurse Claire Randall, who time travels to 18th-century Scotland and finds adventure and romance with the dashing Highland warrior Jamie Fraser. The books have sold over 25 million copies worldwide as of August 2014.
                </p>
                <p className="details-info">Language: English</p>
                <p className="details-info">Published: 1991</p>
                <div className='details-info'>Genre: Hystorical fantasy</div>
                <div className='details-comments'>
                        <form className='form'>
                            <label htmlFor="comment">
                                Write your comment:
                                <input className='btn' type="button" value="Submit"/>
                            </label>
                            <br/>
                            <textarea name="comment" id="comment" cols="100" rows="5"></textarea>
                            <br/>
                        </form>                
                </div>
            </div>
            
        </div>
    )
}

export default BookDetails;