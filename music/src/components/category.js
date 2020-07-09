import React, {Component} from 'react';
import axios from 'axios';
import { Link} from 'react-router-dom';
// import { Button } from 'react-bootstrap';


export default class Category extends Component{
    constructor(props){
        super(props);
        // let mat = path;

        this.deletePost = this.deletePost.bind(this);

        this.state = { posts: [],
        categories: [] };
    }

    componentDidMount(){
        axios.get('/posts/category/'+ this.props.match.params.catId)
        .then(response => {
            // const Fpic = require(`../images/${response.data.post_image}`);
            this.setState({
                posts: response.data
            });
            console.log(this.state.posts);
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
    }

    deletePost(id){
        axios.delete('/posts/'+id)
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
                <h1 className="text-center text-info">First--Blog</h1>
                <div>
                    <ul className="list-group-horizontal">
                    { this.state.categories.map(cat => {
                        return(
                            <li className="list-group-item"><Link to={`category/${cat.category}`} className='text-danger'>{cat.category}</Link></li>
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
                        { this.state.posts.map(currentpost => {
                            const image = currentpost.post_image;
                           
                            var id = 'make' +currentpost.post_id 
                            id  = require(`../images/${image}`);
            return (<div className="p-2 p-md-4" key={currentpost.post_id}>
                    {/* <a href="post.php?p_id=<?php echo $post_id?>"> */}
                    <h3 className="pt-md-2 text-capitalize">
                            {currentpost.post_title}
                          </h3>
                          <h6 className="pt-md-2 font-italic">
                            By {currentpost.post_author}
                          </h6>
                        {/* <div class="col-lg-6 col-md-6 col-6"> */}
                          {/* <div class="row justify-content-center"> */}
                            <img width='' height='' className='img-responsive img-fluid img-thumbnail' alt={image} src={id} />
                          {/* </div> */}
                        {/* </div>
                        <div className="col-lg-6 col-md-6 col-6 text-center"> */}
                        <p className='glyphicon glyphicon-time pt-md-2'>
                            {currentpost.post_content.substring(0, 200)}...
                          </p>
                          <Link to={`post/${currentpost._id}`} className='text-danger'>Read more{" >"}</Link>
                          <p className='glyphicon glyphicon-time pt-md-2'>
                            on &nbsp;
                            {new Date(currentpost.post_date).getDate()}-{new Date(currentpost.post_date).getUTCMonth()}-{new Date(currentpost.post_date).getFullYear()}
                          </p>
                        {/* </div> */}
                      
                    {/* </a> */}
                    <hr />
                </div>)
        }) }
        </div>
        </div>
        </div>
            </div>
        )
    }
}