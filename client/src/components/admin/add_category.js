import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

// import {Link} from 'react-router-dom';

export default class AddCategory extends Component{
    constructor(props){
        super(props);
        this.deletePost = this.deletePost.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onPost = this.onPost.bind(this);

        this.state={
            post_category: '',
            post_categories: []
        }
    }
    componentDidMount(){
        axios.get('http://localhost:5001/categories/')
        .then(response => {
            if (response.data.length > 0){
                this.setState({
                    post_categories: response.data,
                    // post_category: response.data[0].category
                });
            } else console.log('no data found');
        });
    }

    onChangeCategory(e){
        this.setState({
            post_category: e.target.value
        });
        // console.log(e.target.value);
    }
   
    
    onSubmit(e){
        e.preventDefault();
    }

    deletePost(id){
        axios.delete('http://localhost:5001/categories/'+id)
        .then(res => {console.log(res.data)
            this.setState({
                post_categories: this.state.post_categories.filter(el => el._id !== id)
            });
            alert(res.data)
        })
        .catch((error) => console.log(error));
    }

    onPost(){
        const category = {
            post_category: this.state.post_category
        };
        console.log(category);
        
        
        axios.post('http://localhost:5001/categories/add', category)
        .then(res => {console.log(res.data);alert(res.data);
            axios.get('http://localhost:5001/categories/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        post_categories: response.data,
                        // post_category: response.data[0].category
                    });
                } else console.log('no data found');
            });})
        .catch(err => alert('err: ' + err));

        

        // window.location = '/';
    }

    render(){
        return(
            <div>
                <div>
                    <h3>Saved Posts</h3>
                    <Table striped bordered hover responsive variant="dark">
                        <thead className='thead-light'>
                            <tr>
                                <th>Id</th>
                                <th>Category</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            { this.state.post_categories.map(currentpost => {
                               
                return <tr key={currentpost._id}>
                            <td>{currentpost.category_id}</td>
                            <td>{currentpost.category}</td>
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
                <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                    
                    <div className="form-group">
                        <label htmlFor="title">Post Category</label>
                        <input type="text" className="form-control" name="post_author" required value={this.state.post_category} onChange={this.onChangeCategory} />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary" type='submit' onClick={this.onPost} >Add Category</button>
                    </div>
                </form>
            </div>
        )
    }
}