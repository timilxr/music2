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
        return(<div className='d-block py-4'>
        {/* <ul className="list-group list-group-horizontal mx-auto"> */}
            {this.state.authors.map(author =>{
                const fullname = author.firstname + ' ' + author.lastname;
            return(<div className='px-2 bd-highlight text-capitalize' style={{fontFamily: 'Ubuntu'}}  key={author._id}><Link to={`/author/${fullname}`} className='text-decoration-none'><b><i>{fullname}</i></b></Link></div>);
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
            return (<div  key={currentpost.post_id}>
                <div className="row mb-5 py-3 rounded shadow-sm d-none d-sm-flex">
                <div className='col-md-8 py-2'>
                        <h4 className="text-capitalize" style={{fontFamily: 'YellowTail'}}>
                            {currentpost.post_title}
                        </h4>
                        <ReactQuill
                        value={currentpost.post_content.substring(0, 100)}
                        readOnly={true}
                        // style={{fontSize: 0.2 + 'vw'}}
                        theme={"bubble"} className='glyphicon glyphicon-time pt-md-2'
                        />
                        {/* <hr className="d-none d-sm-block"/> */}
                        <div className="row py-0">
                            <div className="col-md-8 col-8 py-0 my-0">
                                <span className="pt-md-2 font-italic my-0 h6 mr-1" style={{fontFamily: 'Tisa Sans Pro Bold'}}>
                                    {/* <h6> */}
                                        <FontAwesomeIcon icon={faUser} /> By {currentpost.post_author}
                                    {/* </h6> */}
                                </span>
                                <span className='glyphicon glyphicon-time pt-md-2 h6 pl-2' style={{fontFamily: 'Tisa Sans Pro Bold'}}>
                                    {/* <p className="h6"> */}
                                        <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;
                                        {new Date(currentpost.post_date).getDate()}-{new Date(currentpost.post_date).getMonth()}-{new Date(currentpost.post_date).getFullYear()}
                                    {/* </p> */}
                                </span>
                            </div>
                            <div className="col-md-4 col-4 px-md-3 pl-0">
                                <Link to={`/post/${currentpost._id}`} className='text-danger text-rigth ml-auto'>
                                    <Button variant="primary" size="sm" className="text-right">
                                        <h6 className="my-0">
                                            Read more...
                                        </h6>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-4 pl-1 pr-0 my-auto'>
                    <img width='' height='' className='img-responsive img-fluid rounded' alt={image} src={id} />
                    </div>
                    <hr />
                </div>
                <div class="col-12">
                    <div className="card shadow mb-3 rounded d-block d-sm-none">
                    <img className='img-responsive img-fluid rounded card-img-top' alt={image} src={id} />
                        <div className="card-body">
                            <h5 className="card-title" style={{fontFamily: 'YellowTail'}}>{currentpost.post_title}</h5>
                            <p className="card-text">
                                <ReactQuill
                                value={currentpost.post_content.substring(0, 800)}
                                readOnly={true}
                                theme={"bubble"} className='glyphicon glyphicon-time pt-md-2'
                                />
                            </p>
                        </div>
                        <div className="card-footer px-2">
                            <div className="row py-0">
                                <div className="col-md-8 col-8 py-0 my-0">
                                    <span className="pt-md-2 font-italic my-0 h6 mr-1" style={{fontFamily: 'Tisa Sans Pro Bold'}}>
                                        {/* <h6> */}
                                            <FontAwesomeIcon icon={faUser} /> By {currentpost.post_author}
                                        {/* </h6> */}
                                    </span>
                                    <span className='glyphicon glyphicon-time pt-md-2 h6 pl-1' style={{fontFamily: 'Tisa Sans Pro Bold'}}>
                                        {/* <p className="h6"> */}
                                            <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;
                                            {new Date(currentpost.post_date).getDate()}-{new Date(currentpost.post_date).getMonth()}-{new Date(currentpost.post_date).getFullYear()}
                                        {/* </p> */}
                                    </span>
                                </div>
                                <div className="col-md-4 col-4 px-md-3 pl-0">
                                    <Link to={`/post/${currentpost._id}`} className='text-danger text-rigth ml-auto'>
                                        <Button variant="outline-primary" size="sm" className="text-right">
                                            <h6 className="my-0">
                                                Read more...
                                            </h6>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>)
        }) }
        </div>
        <div className="col-md-3 col-12 ml-auto">
            <div className="shadow rounded p-2 mb-5">
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