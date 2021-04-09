import { Route, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import CreateBook from './CreateBook'
import ListOfBooks from './ListOfBooks'
import BookDetails from './BookDetails';
import UserContext from '../Contexts/UserContext';

function Books(){

    const [user] = useContext(UserContext);
    const history = useHistory();

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
                    <ListOfBooks clickBook={(id) => getBookDetails(id)}/>
                </Route>

                <Route path='/books/create' component={CreateBook}/>
                <Route path='/books/details/:id' component={BookDetails} />

            </div>
        </div>
    ) 
}

export default Books;