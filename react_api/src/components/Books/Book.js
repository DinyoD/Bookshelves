import { Route } from 'react-router-dom';

import Button from '../Shared/Button';
import Create from '../Books/Create'

function Book({history}){

    const handleClick = (path) => {

        history.push(`/books/${path.toLowerCase()}`)
    }
    return (
        <div>
            <div>
                <Route path='/books' exact>
                    <Button text='Create' color='forestgreen' click={handleClick} />
                    <Button text='Remove' color='sandybrown' click={handleClick} />
                </Route>
                
                <Route path='/books/create' component={Create}/>
            </div>
        </div>
    )
}

export default Book;