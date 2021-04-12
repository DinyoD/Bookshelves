import {useState, useEffect} from 'react';

const 
Dropdown = ({name, data}) => {

    const[collection, setCollection] = useState([]);

    useEffect(()=>{
        setCollection([name, ...data])
    },[data])   

    return (
        <select className='header-nav-dropdown header-nav-link' defaultValue={name}>

            {collection.map((x, i)=> (<option className='dropdown-option' key={i} value={x}>{x}</option>))}

        </select>
    )
}
export default Dropdown; 

// to={`${name.toLowerCase()}/${x.toLowerCase()}`}

