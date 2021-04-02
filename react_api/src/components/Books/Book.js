import { Route } from 'react-router-dom';

import Button from '../Shared/Button';
import CreateBook from './CreateBook'

function Book({history}){

    const handleClick = (path) => {

        history.push(`/books/${path.toLowerCase()}`)
    }
    return (
        <div>
            <div>
                <Route path='/books' exact>
                    <Button text='Create' color='forestgreen' click={handleClick} />
                    <Button text='Book' color='sandybrown' click={handleClick} />
                </Route>
                
                <Route path='/books/create' component={CreateBook}/>
            </div>
        </div>
    )
}

export default Book;