import React, {useState, useEffect} from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link} from 'react-router-dom';
import axios from 'axios';


const Header = ({path: {location: {pathname}}, ...props}) => {
    const [categories, setCategories] = useState([]);

    useEffect(()=>{
        axios.get('/categories/')
        .then(response => {
            setCategories(response.data);
        })
        .catch((error) => console.log(error));
    })
    // console.log(categories);
    // console.log(props);
    // console.log(pathname);
    return(
        <Navbar collapseOnSelect bg="dark" variant="dark" expand="md" className="">
        <Link to='/' className="nav-link text-shadow font-weight-bolder" style={{ fontFamily: 'leelawadee Ui', textShadow: `2px 2px 4px #000000` }}><Navbar.Brand><h1 className="nav-link text-shadow font-weight-bolder">WeBLOG</h1></Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto" defaultActiveKey={pathname}>
                {categories.map(cat => (
                    <Link to={`/category/${cat.category}`} className='nav-link' key={cat._id}>
                        <Navbar.Text className="px-md-5 text-white m-auto h4">{cat.category}</Navbar.Text>
                    </Link>
                ))}
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    )
}

export default Header;