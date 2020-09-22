import React, {Component} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
// import { Button } from 'react-bootstrap';


export default class Home extends Component{
    constructor(props){
        super(props);
        // let mat = path;

        this.deletePost = this.deletePost.bind(this);

        this.state = { posts: [],
            authors: [],
        categories: [] };
    }

    componentDidMount(content, delta, source, editor){
        axios.get('/posts/')
        .then(response => {
            this.setState({
                posts: response.data
            });
            // response.data.forEach(post => {
            //     post.post_content = editor.getText(post.post_content);
            // });
            // console.log(editor.getText(this.state.posts[0].post_content));
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

    deletePost(id){
        axios.delete('/posts/'+id)
        .then(res => console.log(res.data));
            this.setState({
                posts: this.state.posts.filter(el => el._id !== id)
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
            <div>
                <h1 className="text-center text-info shadom"><Link to='/' className='text-decoration-none'>WeBlog</Link></h1>
                <div>
                    <hr />
                    <ul className="list-group list-group-horizontal">
                    { this.state.categories.map(cat => {
                        return(
                            <li className="list-group-item mx-auto" key={cat.category_id}><Link to={`/category/${cat.category}`} className='text-danger text-decoration-none'>{cat.category}</Link></li>
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
                           
                            var id = `http://localhost:5001/${image}`;
                            // id  = require(`../../../images/${image}`);
                            // id  = require(`../images/${image}`);
            return (<div className="p-2 p-md-4 row shadow mb-3 rounded" key={currentpost.post_id}>
                <div className='col-3 pt-3'>
                <img width='' height='' className='img-responsive img-fluid img-thumbnail mx-auto d-block rounded' alt={image} src={id} />
                </div>
                    <div className='col-9'>
                        {/* <a href="post.php?p_id=<?php echo $post_id?>"> */}
                    <h3 className="pt-md-2 text-capitalize">
                            {currentpost.post_title}
                          </h3>
                          <span className="pt-md-2 font-italic mr-3">
                            <FontAwesomeIcon icon={faUser} /> By {currentpost.post_author}
                          </span>
                          <span className='glyphicon glyphicon-time pt-md-2'>
                          <FontAwesomeIcon icon={faClock} />&nbsp;
                            {new Date(currentpost.post_date).getDate()}-{new Date(currentpost.post_date).getMonth()}-{new Date(currentpost.post_date).getFullYear()}
                          </span>
                        {/* <div class="col-lg-6 col-md-6 col-6"> */}
                          {/* <div class="row justify-content-center"> */}
                            
                          {/* </div> */}
                        {/* </div>
                        <div className="col-lg-6 col-md-6 col-6 text-center"> */}
                        {/* <div dangerouslySetInnerHTML={{__html: currentpost.post_content.substring(0, 400)}} className='glyphicon glyphicon-time pt-md-2'> */}
                            {/* {this.state.post_content} */}
                            
                     {/* </div>  */}
                     <ReactQuill
                        value={currentpost.post_content.substring(0, 800)}
                        readOnly={true}
                        theme={"bubble"} className='glyphicon glyphicon-time pt-md-2'
                        />
                          
                          <Link to={`/post/${currentpost._id}`} className='text-danger'><h6>Read more{" >"}</h6></Link>
                        {/* </div> */}
                      
                    {/* </a> */}
                    </div>
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