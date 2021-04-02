import { Route } from 'react-router-dom';

import Button from '../Shared/Button';
import CreateBook from './CreateBook'
import AllBooks from './AllBooks'

function Book({history}){

    const handleClick = (path) => {

        history.push(`/books/${path}`)
    }
    return (
        <div>
            <div>
                <Route path='/books' exact>
                    <Button text='Create' color='forestgreen' path='create' click={handleClick} />
                    <Button text='All Book' color='sandybrown' path='all' click={handleClick} />
                </Route>
                
                <Route path='/books/create' component={CreateBook}/>
                <Route path='/books/all' component={AllBooks}/>
            </div>
        </div>
    )
}

export default Book;