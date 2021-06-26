import React, {useEffect, useState} from'react';
import { Link} from 'react-router-dom';
import axios from 'axios';


const Authors = ({refreshAuthor, ...props}) => {
    const [authors, setAuthors] = useState([]);

    useEffect(()=>{
        axios.get('/users/')
        .then(response => {
            setAuthors(...authors, response.data);
        })
        .catch((error) => console.log(error));
        // console.log(props);
    }, [])

    return(
        <div className='d-block py-4'>
            {authors.map(author => {
                const fullname = author.firstname + ' ' + author.lastname;
            return(
            <div className='px-2 bd-highlight text-capitalize' style={{fontFamily: 'Ubuntu'}}  key={author._id} onClick={ refreshAuthor ? () => refreshAuthor(fullname) : (e) => e.preventDefault()}>
                <Link to={`/author/${fullname}`} className='text-decoration-none'>
                    <b><i>{fullname}</i></b>
                </Link>
            </div>);
            })
            }
       </div>
    )
}

export default Authors;