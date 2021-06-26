import React, {Component} from 'react';
import axios from 'axios';
import PostCard from '../components/postCard';
import Authors from '../components/authors';
import Header from '../components/header';
import SearchBar from '../components/searchBar';




export default class Home extends Component{
    constructor(props){
        super(props);

        this.handlesearch = this.handlesearch.bind(this);

        this.state = { loading: true, empty: true,
        tempPosts: [],
        posts: []};
    }

    componentDidMount(content, delta, source, editor){
        axios.get('/posts/')
        .then(response => {
            this.setState({
                ...this.state,
                loading: false,
                empty: false,
                posts: response.data,
                tempPosts: response.data
            });
            
        })
        .catch((error) => console.log(error));
    }


    handlesearch(e){
        if (e.target.value){
            let newposts = [];
            this.state.tempPosts.map(post => {
                const {post_title, post_author, post_category} = post;
                if (post_title.toLowerCase().includes(e.target.value.toLowerCase())){
                    newposts = [...newposts, post];
                    console.log(post);
                } else if (post_author.toLowerCase().includes(e.target.value.toLowerCase())){
                    newposts = [...newposts, post];
                    console.log(post);
                } else if (post_category.toLowerCase().includes(e.target.value.toLowerCase())){
                    newposts = [...newposts, post];
                    console.log(post);
                }
            });
            if (newposts.length > 0) {
                console.log(newposts);
                this.setState({
                    ...this.state,
                    posts: [...newposts]
                })
            } 
            else {
                this.setState({
                    ...this.state,
                    empty: true
                })
            }
        }
        else {
            this.setState({
                ...this.state,
                posts: this.state.tempPosts
            })
        }
        
    }


    render(){
        const {posts, empty, loading} = this.state;
        return(
            <div className='bg-ligth-gray'>
                <Header path={this.props} />

                <div className="container pt-5">

                    <SearchBar search={this.handlesearch} text="Filter by Title, Author or Category" />

                    <div className="d-flex flew-wrap row mt-5 p-md-5">
                        <div  className="col-md-8 col-12 p-2 mt-md-5" >
                            { 
                                loading ? (<center><h2>Loading...</h2></center>) :
                                (
                                    empty ? (<center><h2>No Post</h2></center>) :
                                    posts.map(currentpost => ( <PostCard post={currentpost} key={currentpost._id} /> ))
                                )
                            }
                        </div>
            
                        <div className="col-md-3 col-12 ml-auto mt-md-5">
                            <div className="shadow rounded p-2 mb-5">
                                <h2 className="text-center">Authors</h2>
                                <Authors />
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