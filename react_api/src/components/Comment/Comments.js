
import CommentCard from './CommentCard';

import { dateOptions } from "../../data/data.json"

const Commenst = ({comments, book, user, clickDel, clickEdit})=> {
    console.log(user);
    comments = comments?.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return d - c;
    }).map(x=>({...x, date: (new Date(x.date)).toLocaleDateString("en-GB", dateOptions)}))
   
    return (
        <div className="comments-container">
            {comments
                ?.map(x => (<CommentCard 
                                key={x._id} 
                                comment={x} 
                                book={book} 
                                user={user}
                                clickDel={clickDel}
                                clickEdit={clickEdit}
                            />)
                    )
            }
        </div>
    )
};


export default Commenst;