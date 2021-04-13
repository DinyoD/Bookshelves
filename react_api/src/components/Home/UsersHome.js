import { useContext } from 'react';
import { NavLink, Route, useHistory } from 'react-router-dom';

import CreateBook from '../Books/CreateBook';
import AllBooks from '../Books/AllBooks'
import BookDetails from '../Books/BookDetails';

import UserContext from '../Contexts/UserContext';

import { booksGroup } from '../../data/data.json';

const UsersHome = () => {

    const [user] = useContext(UserContext);

    const history = useHistory();


    const getBookDetails = (id) => {
        if (user) {
            history.push(`/books/details/${id}`)
        }
    }

    return (
        <>
             <div className='home-links-container'>
                <NavLink to="/books" exact={true} className="home-link" activeClassName="active">All Books</NavLink>
                <NavLink to="/books/mybooks" className="home-link" activeClassName="active">My Books</NavLink>
                <NavLink to="/books/wishlist" className="home-link" activeClassName="active">Wish list</NavLink>
            </div>
            <Route exact path="/books"  render={(props) => <AllBooks {...props} group={booksGroup.all} clickBook={(id) => getBookDetails(id)}/>}/>
            <Route path="/books/mybooks" render={(props) => <AllBooks {...props} group={booksGroup.myBooks} clickBook={(id) => getBookDetails(id)}/>}/>
            <Route path="/books/wishlist" render={(props) => <AllBooks {...props} group={booksGroup.wishList} clickBook={(id) => getBookDetails(id)}/>}/>
            <Route path='/books/create' render={(props) => <CreateBook {...props} update={false}/>}/>
            <Route path='/books/details/:id' component={BookDetails} />
            <Route path='/books/update/:id' render={(props) => <CreateBook {...props} update={true}/>}/>
            <Route path='/books/:id/comments' render={()=><h2>Comments</h2>} />
        </>
    )
}

export default UsersHome;