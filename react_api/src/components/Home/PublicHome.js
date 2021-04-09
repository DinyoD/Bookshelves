import AllBooks from '../Books/AllBooks';
import { booksGroup } from '../../data/data.json';

const PublicHome = () => {
    return <AllBooks group={booksGroup.all} />
}

export default PublicHome;