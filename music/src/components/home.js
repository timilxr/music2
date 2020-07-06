import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';


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
                <div class="container">
                    <div class="row justify-content-center mt-3">
                        <form action="/action_page.php" class="row justify-content-center">
                        <h2>blog search</h2>
                        <input class="form-control f" type="text" placeholder="Search" /><br />
                        <input class="btn f" type="submit" value="Search" />
                        </form>
                    </div>
                    <div class="d-flex flew-wrap row mt-3 p-5">
                        { this.state.posts.map(currentpost => {
                            const image = currentpost.post_image;
                           
                            var id = 'make' +currentpost.post_id 
                            id  = require(`../images/${image}`);
            return <div className="border mx-lg-3 g" width="45">
                    <a href="post.php?p_id=<?php echo $post_id?>">
                      
                        {/* <div class="col-lg-6 col-md-6 col-6"> */}
                          {/* <div class="row justify-content-center"> */}
                            <img width='' height='' className='img-responsive img-fluid' src={id} />
                          {/* </div> */}
                        {/* </div>
                        <div className="col-lg-6 col-md-6 col-6 text-center"> */}
                          <h1 className="text-center">
                            {currentpost.post_title}
                          </h1>
                          <h4 className="text-center">
                            By {currentpost.post_author}
                          </h4>
                          <p className='glyphicon glyphicon-time text-center'>
                            on <br/>
                            {currentpost.post_date}
                          </p>
                        {/* </div> */}
                      
                    </a>
                </div>
        }) }
        </div>
        </div>
            </div>
        )
    }
}