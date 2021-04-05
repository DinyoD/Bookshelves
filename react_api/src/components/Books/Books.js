import { Route } from 'react-router-dom';

import CreateBook from './CreateBook'
import AllBooks from './AllBooks'
import BookDetails from './BookDetails';

function Books({history, user}){

    const getBookDetails = (id) => {
        history.push(`/books/details/${id}`)
    }

    return (
        <div>
            <div>
               
                <Route exact path='/books'>
                    <AllBooks clickBook={(id) => getBookDetails(id)} />
                </Route>

                <Route path='/books/create' component={CreateBook}/>
                <Route path='/books/details/:id' render={(props) => <BookDetails {...props} user={user} />}>
                    
                </Route>
            </div>
        </div>
    ) 
}

export default Books;