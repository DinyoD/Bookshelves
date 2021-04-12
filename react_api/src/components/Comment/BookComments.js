
import CommentCard from './CommentCard';

import { dateOptions } from "../../data/data.json";

const BookCommenst = ({comments})=> {

    comments = comments.sort(function(a, b) {
        var c = new Date(a.date);
        var d = new Date(b.date);
        return d - c;
    }).map(x=>({...x, date: (new Date(x.date)).toLocaleDateString("en-GB", dateOptions)}))
  
    console.log(comments);
    
    return (
        <div className="book-comments-container">
            {comments
                .map(x => (<CommentCard key={x._id} comment={x}/>))}
        </div>
    )
};


export default BookCommenst;