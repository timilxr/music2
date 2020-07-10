import React, {Component} from 'react';
import axios from 'axios';
import { BrowserRouter as Router,
    Switch,
    Route,
    Link,
    // useRouteMatch,
    useParams } from 'react-router-dom';
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
post_id: '',
pic: '' };
    }

    componentDidMount(){
        axios.get('/posts/'+ this.props.match.params.topicId)
        .then(response => {
            const Fpic = require(`../images/${response.data.post_image}`);
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
              <h2>Topics</h2>
        
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
          <div>
             <div>
                    <ul className="list-group list-group-horizontal text-center">
                    { this.state.categories.map(cat => {
                        return(
                            <li className="list-group-item m-auto" key={cat.category_id}><Link to={`/category/${cat.category}`} className='text-danger'>{cat.category}</Link></li>
                        )
                    })}
                    </ul>
                    <hr />
                </div>
            <div className="row">
               <div className="col-8">
                   
               <div className="p-2 p-md-4" key={this.state.post_id}>
                    {/* <a href="post.php?p_id=<?php echo $post_id?>"> */}
                    <h1 className="pt-md-2 text-capitalize text-center">
                            {this.state.post_title}
                          </h1>
                          <h4 className="pt-md-2 font-italic text-center">
                            By: {this.state.post_author}
                          </h4>
                        {/* <div class="col-lg-6 col-md-6 col-6"> */}
                          {/* <div class="row justify-content-center"> */}
                            <img width='' height='' className='img-responsive img-fluid img-thumbnail' alt={this.state.post_image} src={this.state.pic} />
                          {/* </div> */}
                        {/* </div>
                        <div className="col-lg-6 col-md-6 col-6 text-center"> */}
                        <p className='glyphicon glyphicon-time pt-md-2'>
                            {this.state.post_content}
                          </p>
                          {/* <Link to={`post/${this.state._id}`} className='text-danger'>Read more{" >"}</Link> */}
                          <p className='glyphicon glyphicon-time pt-md-2'>
                            on &nbsp;
                            {new Date(this.state.post_date).getDate()}-{new Date(this.state.post_date).getUTCMonth()}-{new Date(this.state.post_date).getFullYear()}
                          </p>
                        {/* </div> */}
                      
                    {/* </a> */}
                    <hr />
                </div>
               </div>
               <div className="col-4">
                   {this.exerciseList()}
               {this.props.match.url}
               </div>
            </div>
          </div>
        )
    }
}