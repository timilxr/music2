import React, {Component} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
// import { Button } from 'react-bootstrap';


export default class Category extends Component{
    constructor(props){
        super(props);
        // let mat = path;

        this.deletePost = this.deletePost.bind(this);

        this.state = { posts: [],
            authors: [],
        categories: [] };
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
        axios.get('/users/')
        .then(response => {
            this.setState({
                authors: response.data
            });
            // alert(response.data);
        })
        .catch((error) => console.log(error));
        axios.get('/posts/category/'+ this.props.match.params.catId)
        .then(response => {
            // console.log(this.props.match.params.catId);
            // const Fpic = require(`../images/${response.data.post_image}`);
            this.setState({
                posts: response.data
            });
            // console.log(response.data[0]);
            // alert("timi");
            // alert(response.data);
        })
        .catch((error) => console.log(error));
    }

    deletePost(g){
        axios.get('/posts/category/'+ g)
        .then(response => {
            this.setState({
                posts: response.data
            });
            console.log(response.data[0]);
            console.log(g);
        })
        .catch((error) => console.log(error));
    }

    authors(){
        return(<div className='d-flex flex-wrap'>
        {/* <ul className="list-group list-group-horizontal mx-auto"> */}
            {this.state.authors.map(author =>{
                const fullname = author.firstname + ' ' + author.lastname;
            return(<div className='px-2 bd-highlight text-capitalize'  key={author._id}><Link to={`/author/${fullname}`} className='text-decoration-none'>{fullname}</Link></div>);
            })
            }
       {/* </ul> */}
       </div>
        )
    }

    // postList(){
    //     return 
    // }

    render(){
        return(
            <div className='pt-4'>
                <h1 className="mb-5 text-center text-info text-shadow font-weight-bolder display-4" style={{ fontFamily: 'leelawadee UI', textShadow: `2px 2px 4px #000000` }}><Link to='/' className='text-decoration-none'>WeBlog</Link></h1>
                <div>
                    <hr />
                    <ul className="nav nav-pills">
                    { this.state.categories.map(cat => {
                        return(
                          <li className='nav-item m-auto' key={cat.category_id}>
                            <Link to={`/category/${cat.category}`} onClick={()=>{this.deletePost(cat.category)}} className='text-info bg-light active text-sm-center nav-link m-auto'>{cat.category}</Link>
                          </li>
                        )
                    })}
                    </ul>
                    <hr />
                </div>

                <div className="container">
                    <div className="row justify-content-center mt-3">
                        <form action="/action_page.php" className="row justify-content-center">
                        <h2>blog search</h2>
                        <input className="form-control f" type="text" placeholder="Search" /><br />
                        <input className="btn f" type="submit" value="Search" />
                        </form>
                    </div>
                    <div className="d-flex flew-wrap row mt-3 p-md-5">
                    <div  className="col-md-8 col-12 p-2" >
                        { this.state.posts.map(currentpost => {
                            const image = currentpost.post_image;
                           
                            var id = 'make' +currentpost.post_id 
                            id  = `/${image}`;
            return (<div className="p-2 p-md-4 shadow mb-3 rounded" key={currentpost.post_id}>
                    {/* <a href="post.php?p_id=<?php echo $post_id?>"> */}
                    <h3 className="pt-md-2 text-capitalize">
                            {currentpost.post_title}
                          </h3>
                          
                        {/* <div class="col-lg-6 col-md-6 col-6"> */}
                          {/* <div class="row justify-content-center"> */}
                            <img width='' height='' className='img-responsive img-fluid img-thumbnail' alt={image} src={id} />
                          {/* </div> */}
                        {/* </div>
                        <div className="col-lg-6 col-md-6 col-6 text-center"> */}
                        <ReactQuill
                        value={currentpost.post_content.substring(0, 800)}
                        readOnly={true}
                        theme={"bubble"} className='glyphicon glyphicon-time pt-md-2'
                        />
                        <span className="pt-md-2 font-italic mr-3">
                            By <FontAwesomeIcon icon={faUser} /> {currentpost.post_author}
                          </span>
                          <span className='glyphicon glyphicon-time pt-md-2'>
                          <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;
                            {new Date(currentpost.post_date).getDate()}-{new Date(currentpost.post_date).getMonth()}-{new Date(currentpost.post_date).getFullYear()}
                          </span>
                          <Link to={`/post/${currentpost._id}`} className='text-danger'><h6>Read more{" >"}</h6></Link>
                          {/* <p className='glyphicon glyphicon-time pt-md-2'>
                            on &nbsp;
                            <FontAwesomeIcon icon={faClock} /> &nbsp;
                            {new Date(currentpost.post_date).getDate()}-{new Date(currentpost.post_date).getUTCMonth()}-{new Date(currentpost.post_date).getFullYear()}
                          </p> */}
                        {/* </div> */}
                      
                    {/* </a> */}
                    <hr />
                </div>)
        }) }
        </div>
        <div className="col-md-4 col-12">
            <div className="shadow rounded p-2">
                <h2 className="text-center">Authors</h2>
                {/* <div className=""></div> */}
                {this.authors()}
            </div>
            <div className="shadow rounded p-2">
                <h2 className="text-center my-3">Tags</h2>
            </div>
        </div>
        </div>
        </div>
            </div>
        )
    }
}