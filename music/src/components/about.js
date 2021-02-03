import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './about.css';

export default class About extends Component{
    constructor(props){
        super(props);
        this.state={
            categories: []
        };
    }

    componentDidMount(){
        axios.get('/categories/')
        .then(response => {
            this.setState({
                categories: response.data
            });
            // alert(response.data);
        })
        .catch((error) => console.log(error));
    }

    render(){
        // const image = require('../IMG-20200929-WA0000.jpg');
        return(
            <div style={{backgroundImage: '../IMG-20200929-WA0000.jpg', backgroundSize: 'cover'}}>
                <h1 className="mb-5 text-center text-info text-shadow font-weight-bolder display-4" style={{ fontFamily: 'leelawadee UI', textShadow: `2px 2px 4px #000000` }}><Link to='/' className='text-decoration-none'>WeBlog</Link></h1>
                <div>
                    <hr />
                    <ul className="nav nav-pills">
                    { this.state.categories.map(cat => {
                        return(
                          <li className='nav-item m-auto' key={cat.category_id}>
                            <Link to={`/category/${cat.category}`} className='text-info bg-light active text-sm-center nav-link m-auto'>{cat.category}</Link>
                          </li>
                        )
                    })}
                    </ul>
                    <hr />
                </div>
                    <div className='details'></div>

                {/* <img width='100%' className='' src={image} alt='About us'/> */}
            </div>
        );
    }
}