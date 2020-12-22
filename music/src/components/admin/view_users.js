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

export default class ViewUser extends Component{
    constructor(props){
        super(props);

        this.deleteUser = this.deleteUser.bind(this);

        this.state = { posts: [],
        category: props.category };
    }

    componentDidMount(){
        axios.get('/users/')
        .then(response => {
            this.setState({
                posts: response.data
            });
            // alert(response.data);
        })
        .catch((error) => console.log(error));
    }

    deleteUser(id){
        axios.delete('/users/'+id)
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
        const category = this.state;
       if(category === 'Admin'){
        return(
            <div>
                <h3>Saved Posts</h3>
                <Table striped bordered hover responsive variant="dark">
                    <thead className='thead-light'>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>&nbsp;</th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.posts.map(currentpost => {
            return <tr key={currentpost._id}>
                        <td>{currentpost.firstname}</td>
                        <td>{currentpost.lastname}</td>
                        <td>{currentpost.email}</td>
                        <td>{currentpost.date.substring(0,10)}</td>
                        <td>
                            <Link to={'/admin/Edit_post/'+currentpost._id}>
                                <Button variant="outline-primary">Edit</Button>{' '}
                            </Link>
                        </td>
                        <td>
                            <Button variant="outline-danger" onClick={()=>{this.deleteUser(currentpost._id)}}>Delete</Button>{' '}
                        </td>
                    </tr>
            
        }) }
                    </tbody>
                </Table>
            </div>
        )
       } else {
            return(
                <div>
                    <h1>Only Admins Can View Users</h1>
                </div>
            )
       }
    }
}