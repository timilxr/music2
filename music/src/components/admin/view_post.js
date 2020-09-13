import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

// const Post = props => (
//     <tr>
//         <td>{props.post.post_id}</td>
//         <td>{props.post.post_author}</td>
//         <td>{props.post.post_status}</td>
//         <td>{props.post.post_title}</td>
//         <td>{props.post.post_category}</td>
//         <td>{props.post.post_comment_count}</td>
//         <td><img src={props.post.post_image} alt={props.post.post_image} className='img-fluid'/></td>
//         <td>{props.post.post_content}</td>
//         <td>{props.post.post_date.substring(0,10)}</td>
//         <td>
//             <Link to={'/admin/Edit_post/'+props.post._id}>edit</Link> | <a href='#' onClick={()=>{props.deletePost(props.post._id)}}>delete</a>
//         </td>
//     </tr>
// );

export default class ViewPost extends Component{
    constructor(props){
        super(props);

        this.deletePost = this.deletePost.bind(this);

        this.state = { posts: [] };
    }

    componentDidMount(){
        axios.get('/posts/')
        .then(response => {
            this.setState({
                posts: response.data
            });
            console.log(this.props.mail);
            console.log(this.state.posts[0]);
            // alert(response.data);
        })
        .catch((error) => console.log(error));
    }

    deletePost(id){
        axios.delete('/posts/'+id)
        .then(res => alert(res.data));
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
                <Table striped bordered hover responsive variant="dark">
                    <thead className='thead-light'>
                        <tr>
                            <th>Id</th>
                            <th>Author</th>
                            <th>Status</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Comment count</th>
                            <th>Image</th>
                            <th>Content</th>
                            <th>Date</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.posts.map(currentpost => {
                            const name = currentpost.post_image;
                           
                            // var id = 'make' +currentpost.post_id 
                            var id  = require(`../../images/${name}`);
                            console.log(id);
                            
            return <tr key={currentpost._id}>
                        <td>{currentpost.post_id}</td>
                        <td>{currentpost.post_author}</td>
                        <td>{currentpost.post_status}</td>
                        <td>{currentpost.post_title}</td>
                        <td>{currentpost.post_category}</td>
                        <td>{currentpost.post_comment_count}</td>
                        <td><img src={id} alt={currentpost['post_image']} className='img-fluid'/></td>
                        <td dangerouslySetInnerHTML={{__html: currentpost.post_content.substring(0, 400)}} className='pt-md-2 img-fluid'>
                        {/* ...{currentpost.post_content.length} */}
                        </td>
                        <td>{currentpost.post_date.substring(0,10)}</td>
                        <td>
                            <Link to={'/admin/Edit_post/'+currentpost._id}>
                                <Button variant="outline-primary">Edit</Button>{' '}
                            </Link>
                        </td>
                        <td>
                            <Button variant="outline-danger" onClick={()=>{this.deletePost(currentpost._id)}}>Delete</Button>{' '}
                        </td>
                    </tr>
            
        }) }
                    </tbody>
                </Table>
            </div>
        )
    }
}