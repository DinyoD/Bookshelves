import { Route } from 'react-router-dom';
import { useContext } from 'react';
import CreateBook from './CreateBook'
import AllBooks from './AllBooks'
import BookDetails from './BookDetails';
import UserContext from '../Contexts/UserContext';

function Books({history}){

    const [user] = useContext(UserContext);

    const getBookDetails = (id) => {
        console.log(user);
        if (user) {
            history.push(`/books/details/${id}`)
        }
    }

    return (
        <div>
            <div>
               
                <Route exact path='/books'>
                    <AllBooks clickBook={(id) => getBookDetails(id) } />
                </Route>

                <Route path='/books/create' component={CreateBook}/>
                <Route path='/books/details/:id' render={(props) => <BookDetails {...props} user={user} />} />

            </div>
        </div>
    ) 
}

export default Books;