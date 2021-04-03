import { Route } from 'react-router-dom';

import Button from '../Shared/Button';
import CreateBook from './CreateBook'
import AllBooks from './AllBooks'
import BookDetails from './BookDetails';

function Books({history}){

    const handleClick = (path) => {

        history.push(`/books/${path}`)
    }

    const getBookDetails = (id) => {
        history.push(`/books/details/${id}`)
    }

    return (
        <div>
            <div>
                <Route path='/books' exact>
                    <Button text='Create' color='forestgreen' path='create' click={handleClick} />
                    <Button text='All Book' color='sandybrown' path='all' click={handleClick} />
                </Route>
                
                <Route path='/books/create' component={CreateBook}/>

                <Route path='/books/all'>
                    <AllBooks clickBook={(id) => getBookDetails(id)} />
                </Route>

                <Route path='/books/details/:id' component={BookDetails}/>
            </div>
        </div>
    ) 
}

export default Books;