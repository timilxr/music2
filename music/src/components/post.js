import React, {Component} from 'react';
import axios from 'axios';
import './post.css';
import { 
    // BrowserRouter as Router,
    // useRouteMatch,
    // useParams
    Switch,
    Route,
    Link } from 'react-router-dom';
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import Header from './header';
// import { Button } from 'react-bootstrap';


export default class Post extends Component{
    constructor(props){
        super(props);

        this.state = { post_title: '',
                    post_author: '',
                    post_content: '',
                    post_date: '',
                    post_image: '',
                    categories: [],
                    posts: [],
                    post_id: '',
                    pic: '' };
                        }

    componentDidMount(){
        axios.get('/posts/single/'+ this.props.match.params.topicId)
        .then(response => {
            const Fpic = `/${response.data.post_image}`;
            this.setState({
                post_title: response.data.post_title,
                post_author: response.data.post_author,
                post_content: response.data.post_content,
                post_date: response.data.post_date,
                post_image: response.data.post_image,
                post_id: response.data.post_id,
                pic: Fpic
            });
            console.log(this.state.post_title);
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

        axios.get('/posts/')
        .then(response => {
            this.setState({
                posts: response.data
            });
            console.log(this.state.posts);
            // alert(response.data);
        })
        .catch((error) => console.log(error));
    }

    Topic(){
        let { topicId } = this.props.match.params.topicId;
        return <h3>Requested topic ID:{ topicId }</h3>;
      }

    exerciseList(){
        // let match = useRouteMatch();
        // console.log(match.path);
        console.log(this.props.match.url);
        return (
            <div>
              <h1 className="text-center p-2 pt-md-4">About Author</h1>
              <div className="text-center">
              <img className='img-responsive img-fluid img-thumbnail rounded' alt={this.state.post_image} src={this.state.pic} />
              </div>
        
              <ul>
                <li>
                  <Link to={`${this.props.match.url}/components`}>Components</Link>
                </li>
                <li>
                  <Link to={`${this.props.match.url}/props-v-state`}>
                    Props v. State
                  </Link>
                </li>
              </ul>
        
              <Switch>
                <Route path={`post/:topicId`}>
                  {this.Topic()}
                </Route>
                <Route path={this.props.match.path}>
                  <h3>Please select a topic.</h3>
                </Route>
              </Switch>
            </div>
          );
    }

    render(){
        // const { currentpost
        //      } = this.state;
            //  const image = this.state.post_image;
                           
            //                 var id = 'make' +this.state.post_id 
            //                 id  = require(`../images/${image}`);
        return(
          <div className='pt-4'>
            <Header path={this.props} />
        
            <div className="row">
               <div className="col-md-8 col-12">
                   
               <div className="p-2 p-md-4" key={this.state.post_id}>
                    {/* <a href="post.php?p_id=<?php echo $post_id?>"> */}
                    <h1 className="pt-md-2 text-capitalize text-center">
                            {this.state.post_title}
                          </h1>
                          <h5 className="pt-md-2 font-italic text-center">
                            By: <FontAwesomeIcon icon={faUser} /> {this.state.post_author}
                            &nbsp;&nbsp;
                            on &nbsp;
                            <FontAwesomeIcon icon={faCalendarAlt} /> &nbsp;
                  {new Date(this.state.post_date).getDate()}-{new Date(this.state.post_date).getMonth()}-{new Date(this.state.post_date).getFullYear()} 
                             
                          </h5>
                        {/* <div class="col-lg-6 col-md-6 col-6"> */}
                          {/* <div class="row justify-content-center"> */}
                          <div className="text-center">
                          <img width='' height='' className='img-responsive img-fluid img-thumbnail rounded' alt={this.state.post_image} src={this.state.pic} />
                          </div>
                          {/* </div> */}
                        {/* </div>
                        <div className="col-lg-6 col-md-6 col-6 text-center"> */}
                        {/* <div dangerouslySetInnerHTML={{__html: this.state.post_content}} className='content pt-md-2'> */}
                            {/* {this.state.post_content} */}
                     {/* </div>  */}
                     <ReactQuill
                      value={this.state.post_content}
                      readOnly={true}
                      theme={"bubble"}  className='content pt-md-2'
                    />
                          {/* <Link to={`post/${this.state._id}`} className='text-danger'>Read more{" >"}</Link> */}
                          {/* <p className='glyphicon glyphicon-time pt-md-2'>
                            on &nbsp;
                            <FontAwesomeIcon icon={faClock} /> &nbsp;
                            {this.state.post_date ? new Date(this.state.post_date).getDate()-new Date(this.state.post_date).getUTCMonth()-new Date(this.state.post_date).getFullYear() : ''}
                             
                          </p> */}
                        {/* </div> */}
                      
                    {/* </a> */}
                    <hr />
                </div>
               </div>
               <div className="col-md-4 col-12">
                   {/* {this.exerciseList()} */}
               {/* {this.props.match.url} */}
               </div>
               <div className='mx-auto'>
                <div id="carouselExampleSlidesOnly" className="carousel slide " data-ride="carousel">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <h5 className='text-danger w-25 mx-auto bg-dark'>More Related Posts</h5>                                {/* <img width='300' className='img-responsive img-fluid img-thumbnail' src={id} alt={post.post_title} /> */}
                      <div className="carousel-caption d-md-block">
                        <h5 className='text-danger'>More Related Posts</h5>
                        {/* <p>tdsytstg</p> */}
                        {/* <div dangerouslySetInnerHTML={{__html: post.post_content.substring(0, 100)}} className='glyphicon glyphicon-time pt-md-2 text-info'></div> */}
                      </div>
                    </div>
               { this.state.posts.map(post => {
                 var image = post.post_image;
                 var id = `/${image}`;
                  // id  = require(`../../../images/${image}`);
                        return(
                            <div className="carousel-item" key={post.post_id}>
                                 
                                  <img className='img-responsive img-fluid d-block img-thumbnail mx-auto' src={id} alt={post.post_title} />
                                  <div className="carousel-caption d-md-block">
                                    <h5>{post.post_title}</h5>
                                    <p></p>
                                    <div dangerouslySetInnerHTML={{__html: post.post_content.substring(0, 100)}} className='glyphicon glyphicon-time pt-md-2 text-info'></div>
                                  </div>
                                </div>
                        )
                    })}   
                    <a className="carousel-control-prev" href="#carouselExampleSlidesOnly" role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleSlidesOnly   " role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                </div>
               </div> 
            </div>
          </div>
        )
    }
}