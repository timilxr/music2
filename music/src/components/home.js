import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default class Home extends Component{
    constructor(props){
        super(props);

        this.deletePost = this.deletePost.bind(this);

        this.state = { posts: [] };
    }

    componentDidMount(){
        axios.get('http://localhost:5001/posts/')
        .then(response => {
            this.setState({
                posts: response.data
            });
            // alert(response.data);
        })
        .catch((error) => console.log(error));
    }

    deletePost(id){
        axios.delete('http://localhost:5001/posts/'+id)
        .then(res => console.log(res.data));
            this.setState({
                posts: this.state.posts.filter(el => el._id !== id)
            })
        .catch((error) => console.log(error));
    }

    // postList(){
    //     return 
    // }

    render(){
        return(
            <div>
                <h3>Saved Posts</h3>
                <div className="container">
                    <div className="row justify-content-center mt-3">
                        <form action="/action_page.php" className="row justify-content-center">
                        <h2>blog search</h2>
                        <input className="form-control f" type="text" placeholder="Search" /><br />
                        <input className="btn f" type="submit" value="Search" />
                        </form>
                    </div>
                    <div className="d-flex flew-wrap row mt-3 p-md-5">
                        { this.state.posts.map(currentpost => {
                            const image = currentpost.post_image;
                           
                            var id = 'make' +currentpost.post_id 
                            id  = require(`../images/${image}`);
            return (<div className="col-6 p-2 p-md-4" key={currentpost.post_id}>
                    {/* <a href="post.php?p_id=<?php echo $post_id?>"> */}
                      
                        {/* <div class="col-lg-6 col-md-6 col-6"> */}
                          {/* <div class="row justify-content-center"> */}
                            <img width='' height='' className='img-responsive img-fluid img-thumbnail' alt={image} src={id} />
                          {/* </div> */}
                        {/* </div>
                        <div className="col-lg-6 col-md-6 col-6 text-center"> */}
                          <h3 className="pt-md-2 text-center text-capitalize">
                            {currentpost.post_title}
                          </h3>
                          <h6 className="text-center pt-md-2">
                            By {currentpost.post_author}
                          </h6>
                          <p className='glyphicon glyphicon-time text-center pt-md-2'>
                            on <br/>
                            {new Date(currentpost.post_date).getDate()}-{new Date(currentpost.post_date).getMonth()}-{new Date(currentpost.post_date).getFullYear()}
                          </p>
                          <Link to='/' className='nav-link text-danger text-center'><Button variant="outline-danger">Read Post</Button>{' '}</Link>
                            
                        {/* </div> */}
                      
                    {/* </a> */}
                </div>)
        }) }
        </div>
        </div>
            </div>
        )
    }
}