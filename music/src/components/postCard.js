import React from 'react';
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import { Button } from 'react-bootstrap';

const PostCard = ({post, ...props}) => {
    // console.log(post);
    const image = post.post_image;
    var id = `/${image}`;
    return(
        <div  key={post.post_id}>
            <div className="row mb-5 py-3 pr-5 bg-light rounded shadow d-none d-sm-flex">
                <div className='col-md-8 py-2'>
                    <h4 className="text-capitalize font-weight-bolder" style={{fontFamily: 'YellowTail'}}>
                        {post.post_title}
                    </h4>
                    <ReactQuill
                    value={post.post_content.substring(0, 100)}
                    readOnly={true}
                    // style={{fontSize: 0.2 + 'vw'}}
                    theme={"bubble"} className='glyphicon glyphicon-time pt-md-2 mb-auto'
                    />
                    {/* <hr className="d-none d-sm-block"/> */}
                    <div className="row py-0 mt-auto">
                        <div className="col-md-8 col-8 py-0 my-0">
                            <span className="pt-md-2 font-italic my-0 h6 mr-1" style={{fontFamily: 'Tisa Sans Pro Bold'}}>
                                {/* <h6> */}
                                    <FontAwesomeIcon icon={faUser} /> By {post.post_author}
                                {/* </h6> */}
                            </span>
                            <span className='glyphicon glyphicon-time pt-md-2 h6 pl-2' style={{fontFamily: 'Tisa Sans Pro Bold'}}>
                                {/* <p className="h6"> */}
                                    <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;
                                    {new Date(post.post_date).getDate()}-{new Date(post.post_date).getMonth()}-{new Date(post.post_date).getFullYear()}
                                {/* </p> */}
                            </span>
                        </div>
                        <div className="col-md-4 col-4 px-md-3 pl-0">
                            <Link to={`/post/${post._id}`} className='text-danger text-rigth ml-auto'>
                                <Button variant="outline-primary" size="sm" className="text-right">
                                    <h6 className="my-0">
                                        Read more...
                                    </h6>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='col-md-4 pl-1 pr-0 my-auto'>
                    <img width='' height='' className='img-responsive img-fluid rounded' alt={image} src={id} />
                </div>
                <hr />
            </div>
            <div className="col-12">
                <div className="card shadow-sm mb-3 rounded d-block d-sm-none">
                <img className='img-responsive img-fluid rounded card-img-top' alt={image} src={id} />
                    <div className="card-body">
                        <h5 className="card-title mb-0 pb-0" style={{fontFamily: 'YellowTail'}}>{post.post_title}</h5>
                        <span className="card-title pt-md-2 font-italic my-0 pt-0" style={{fontFamily: 'Tisa Sans Pro Bold', fontSize: 3.5 + 'vw'}}>
                            {/* <h6> */}
                                <FontAwesomeIcon icon={faUser} /> By {post.post_author}
                            {/* </h6> */}
                        </span>
                        <p className="card-text">
                            <ReactQuill
                            value={post.post_content.substring(0, 800)}
                            readOnly={true}
                            theme={"bubble"} className='glyphicon glyphicon-time pt-md-2'
                            />
                        </p>
                    </div>
                    <div className="card-footer px-2">
                        <div className="row py-0">
                            <div className="col-6 py-0 my-0">
                                
                                <span className='glyphicon glyphicon-time pt-md-2 h6 pl-1' style={{fontFamily: 'Tisa Sans Pro Bold'}}>
                                    {/* <p className="h6"> */}
                                        <FontAwesomeIcon icon={faCalendarAlt} />&nbsp;
                                        {new Date(post.post_date).getDate()}-{new Date(post.post_date).getMonth()}-{new Date(post.post_date).getFullYear()}
                                    {/* </p> */}
                                </span>
                            </div>
                            <div className="col-6 px-md-3 pl-auto">
                                <Link to={`/post/${post._id}`} className='text-danger text-rigth ml-auto'>
                                    <Button variant="outline-primary" size="sm" className="text-right">
                                        <h6 className="my-0">
                                            Read more...
                                        </h6>
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;