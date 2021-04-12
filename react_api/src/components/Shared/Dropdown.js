import {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const Dropdown = ({name, data}) => {

    const[collection, setCollection] = useState([]);
    const history = useHistory();

    useEffect(()=>{
        setCollection([name, ...data])
    },[data])

    const ChangeValueHandler = (e) => {
        let currValue = e.target.value;
        if (currValue !== name) {
            history.push(`/${name.toLowerCase()}/${currValue.toLowerCase()}`);
            e.target.value = name;
        }
    }

    return (
        <select className='header-nav-dropdown header-nav-link' onChange={ChangeValueHandler}>

            {collection.map((x, i)=> (<option className='dropdown-option' key={i} value={x}>{x}</option>))}

        </select>
    )
}
export default Dropdown; 

// to={`${name.toLowerCase()}/${x.toLowerCase()}`}

