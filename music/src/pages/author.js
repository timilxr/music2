import React, {Component} from 'react';
import axios from 'axios';
import PostCard from '../components/postCard';
import Header from '../components/header';
import Authors from '../components/authors';
import SearchBar from '../components/searchBar';
import { Link} from 'react-router-dom';


export default class Author extends Component{
    constructor(props){
        super(props);
        // let mat = path;

        this.handlesearch = this.handlesearch.bind(this);
        // this.deletePost = this.deletePost.bind(this);
        this.show = this.show.bind(this);
        this.posts = this.posts.bind(this);
        this.refreshAuthor = this.refreshAuthor.bind(this);
        this.noPost = this.noPost.bind(this);

        this.state = { loading: true, empty: true,
            tempPosts: [],
            posts: []};
    }

    componentDidMount(){
        // console.log(this.props.match.params.author);
        axios.get('/posts/author/'+ this.props.match.params.author)
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

        axios.get('/users/')
        .then(response => {
            this.setState({
                ...this.state,
                authors: response.data
            });
        })
        .catch((error) => console.log(error));
    }

    refreshAuthor(g){
        axios.get('/posts/author/'+ g)
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

    // authors(){
    //     return(<div className='d-block py-4'>
    //         {this.state.authors.map(author =>{
    //             const fullname = author.firstname + ' ' + author.lastname;
    //         return(<div className='px-2 bd-highlight text-capitalize' style={{fontFamily: 'Ubuntu'}}  key={author._id} onClick={()=>{this.refreshAuthor(fullname)}}><Link to={`/author/${fullname}`} className='text-decoration-none'><b><i>{fullname}</i></b></Link></div>);
    //             })
    //         }
    //    </div>
    //     )
    // }

    posts(posts){
        // console.log(posts);
        return posts.map(currentpost => ( <PostCard post={currentpost} key={currentpost._id} /> ));
    }

    noPost(){
        console.log('this is not me');
        return(
        <div className="p-2 p-md-4 shadow mb-3 rounded">
            <h3 className="pt-md-2 text-capitalize">
                NO POST YET
            </h3>      
            <hr />
        </div>
        );
    }

    show(){
        const {posts} = this.state;
        if (posts.length > 0) {
            return (this.posts(posts));
        } else {
            return (this.noPost());
        }
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
        const {loading} = this.state;

        return(
            <div className='bg-light-gray'>
                <Header path={this.props} />

                <div className="container pt-5">
                    <SearchBar search={this.handlesearch} text="Filter by Title or Category" />
                    <div className="d-flex flew-wrap row mt-5 p-md-5">
                        <div  className="col-md-8 col-12 p-2" >
                            {
                                // this.show()
                                loading ? (<center><h2>Loading...</h2></center>) : this.show()
                            }
                        </div>
                        <div className="col-md-3 col-12 ml-auto">
                            <div className="shadow rounded p-2 mb-5">
                                <h2 className="text-center">Authors</h2>
                                    <Authors refreshAuthor={this.refreshAuthor} />
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