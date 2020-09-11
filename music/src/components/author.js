import React, {Component} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
// import { Button } from 'react-bootstrap';


export default class Author extends Component{
    constructor(props){
        super(props);
        // let mat = path;

        this.deletePost = this.deletePost.bind(this);

        this.state = { posts: [],
            authors: [],
        categories: [] };
    }

    componentDidMount(){
        console.log(this.props.match.params.author);
        axios.get('/posts/author/'+ this.props.match.params.author)
        .then(response => {
            // const Fpic = require(`../images/${response.data.post_image}`);
            this.setState({
                posts: response.data
            });
            console.log(response.data[0]);
            // alert("timi");
            // alert(response.data);
        })
        .catch((error) => console.log(error));

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

    refreshAuthor(g){
        axios.get('/posts/author/'+ g)
        .then(response => {
            // const Fpic = require(`../images/${response.data.post_image}`);
            this.setState({
                posts: response.data
            });
            console.log(response.data[0]);
            // alert("timi");
            // alert(response.data);
        })
        .catch((error) => console.log(error));
    }

    authors(){
        return(<div class='d-flex flex-wrap'>
        {/* <ul className="list-group list-group-horizontal mx-auto"> */}
            {this.state.authors.map(author =>{
                const fullname = author.firstname + ' ' + author.lastname;
            return(<div className='px-2 bd-highlight text-capitalize'  key={author._id} onClick={()=>{this.refreshAuthor(fullname)}}><Link to={`/author/${fullname}`}>{fullname}</Link></div>);
            })
            }
       {/* </ul> */}
       </div>
        )
    }

    posts(){
        console.log('this is me');
        return(this.state.posts.map(currentpost => {
            const image = currentpost.post_image;
           
            var id = 'make' +currentpost.post_id 
            id  = require(`../images/${image}`);
return (<div className="p-2 p-md-4 shadow mb-3 rounded" key={currentpost.post_id}>
    {/* <a href="post.php?p_id=<?php echo $post_id?>"> */}
    <h3 className="pt-md-2 text-capitalize">
            {currentpost.post_title}
          </h3>
          <h6 className="pt-md-2 font-italic">
            By <FontAwesomeIcon icon={faUser} /> {currentpost.post_author}
          </h6>
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
          <Link to={`/post/${currentpost._id}`} className='text-danger'><h6>Read more{" >"}</h6></Link>
          <p className='glyphicon glyphicon-time pt-md-2'>
            on &nbsp;
            <FontAwesomeIcon icon={faClock} /> &nbsp;
            {new Date(currentpost.post_date).getDate()}-{new Date(currentpost.post_date).getUTCMonth()}-{new Date(currentpost.post_date).getFullYear()}
          </p>
        {/* </div> */}
      
    {/* </a> */}
    <hr />
</div>)
}) );
    }

    noPost(){
        console.log('this is not me');
        return(<div className="p-2 p-md-4 shadow mb-3 rounded">
    {/* <a href="post.php?p_id=<?php echo $post_id?>"> */}
    <h3 className="pt-md-2 text-capitalize">
            NO POST YET
          </h3>
          
            {/* <img width='' height='' className='img-responsive img-fluid img-thumbnail' alt={image} src={id} /> */}
          
    <hr />
</div>);
    }

    show(){
        if (this.state.posts.length > 0) {
            return (this.posts());
        } else {
            return (this.noPost());
        }
    }

    // postList(){
    //     return 
    // }

    render(){
        return(
            <div>
                <h1 className="text-center text-info shadom"><Link to='/' className=''>FIRST--BlOG</Link></h1>
                <div>
                    <ul className="list-group list-group-horizontal">
                    { this.state.categories.map(cat => {
                        return(
                            <li className="list-group-item m-auto"  onClick={()=>{this.deletePost(cat.category)}} key={cat.category_id}><Link to={`/category/${cat.category}`} className='text-danger'>{cat.category}</Link></li>
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
                    <div  className="col-8 p-2" >
                        {/* {this.state.posts == null ? this.posts() : this.noPost()} */}
                        {this.show()}
        </div>
        <div className="col-md-4">
        <div className="shadow mb-3 rounded">
        <h2 className="text-center my-3">Authors</h2>
        <div className="text-center my-3">{this.authors()}</div>
        </div>
        <div className="shadow mb-3 rounded">
        <h2 className="text-center my-3">Tags</h2>
        </div>
        </div>
        </div>
        </div>
            </div>
        )
    }
}