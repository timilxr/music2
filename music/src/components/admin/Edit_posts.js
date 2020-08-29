import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

// import {Link} from 'react-router-dom';

export default class EditPost extends Component{
    constructor(props){
        super(props);
        this.modules = {
            toolbar: [
              [{ 'font': [] }],
              [{ 'size': ['small', false, 'large', 'huge'] }],
              ['bold', 'italic', 'underline'],
              [{'list': 'ordered'}, {'list': 'bullet'}],
              [{ 'align': [] }],
              [{ 'color': [] }, { 'background': [] }],
              ['link', 'image'],
              ['clean']
            ]
        };

        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline',
            'list', 'bullet',
            'align',
            'color', 'background',
            'link ', 'image',
            'clean'
          ];

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        // this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.rteChange = this.rteChange.bind(this);
        this.onPost = this.onPost.bind(this);

        this.state={
            post_title: '',
            post_category: '',
            post_categories: [],
            post_author: '',
            post_status: '',
            post_image: null,
            // post_file: null,
            post_content: '',
            post_date: new Date(),
            richtext: '',
            pic: ''
        };
        // const pic = require(`../images/${this.state.post_image}`);
    }

    rteChange = (content, delta, source, editor) => {
        let gh = editor.getHTML();
        // gh = editor.getText();
        this.setState({
            richtext: gh
        });
        
        console.log(editor.getHTML()); // HTML/rich text
        console.log(editor.getText()); // plain text
        console.log(editor.getLength()); // number of characters
    }

    componentDidMount(){
        axios.get('/posts/single/'+this.props.match.params.id)
        .then(res => {
        const jack = require(`../../images/${res.data.post_image}`);
            this.setState({
                post_title: res.data.post_title,
                post_category: res.data.post_category,
                post_author: res.data.post_author,
                post_status: res.data.post_status,
                post_image: res.data.post_image,
                // post_file: null,
                richtext: res.data.post_content,
                post_date: new Date(res.data.post_date),
                pic: jack
            });
            axios.get('/categories/')
            .then(response => {
                if (response.data.length > 0){
                    this.setState({
                        post_categories: response.data.map(cat=>cat.category),
                        // post_category: response.data[0].category
                    });
                } else console.log('no data found');
            });
            
        console.log(res.data.post_title);
    })
        .catch(err => alert('err: ' + err));
    }

    onChangeTitle(e){
        this.setState({
            post_title: e.target.value
        });
        console.log(this.state.post_title);
    }

    onChangeCategory(e){
        this.setState({
            post_category: e.target.value
        });
        // console.log(e.target.value);
    }
    onChangeAuthor(e){
        this.setState({
            post_author: e.target.value
        });
    }
    onChangeStatus(e){
        this.setState({
            post_status: e.target.value
        });
    }
    onChangeImage(e){
        this.setState({
            post_image: e.target.files[0]
        });
        // console.log(this.state.post_image);
        console.log(e.target.files[0]);
    }
    // onChangeFile(e){
    //     this.setState({
    //         post_file: e.target.files[0]
    //     });
    //     console.log(e.target.files[0]);
    // }
    onChangeContent(e){
        this.setState({
            post_content: e.target.value
        });
    }
    onChangeDate(post_date){
        this.setState({
            post_date: post_date
        });
    }
    onSubmit(e){
        e.preventDefault();
    }
    onPost(){
        // var path = require("path");
        // var postfile = this.state.post_file.split('\\').join('/');
        // var file = path.basename(postfile);
        const posts = {
            post_title: this.state.post_title,
            post_category: this.state.post_category,
            post_author: this.state.post_author,
            post_status: this.state.post_status,
            post_image: this.state.post_image,
            // post_file: this.state.post_file,
            post_content: this.state.richtext,
            post_date: this.state.post_date
        };
        console.log(posts);
        console.log(this.state.post_image);
        // const config = {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // };
        // console.log(posts);
        // const File_path = './../../public/files/' + posts.post_file;
        // const Img_path = './../../public/images/' + posts.post_image;
        
        // const file = new File(File_path);

        // alert(File_path);
        const formdata = new FormData();
        formdata.append('post_title', this.state.post_title);
        formdata.append('post_category', this.state.post_category);
        formdata.append('post_author', this.state.post_author);
        formdata.append('post_status', this.state.post_status);
        formdata.append('post_content', this.state.richtext);
        formdata.append('post_date', this.state.post_date);
        formdata.append('image', this.state.post_image);
        console.log(formdata);
        
        axios.post('/posts/update/'+this.props.match.params.id, formdata)
        .then(res => {console.log(res.data);alert("The file is successfully updated");window.location = '/admin/view_posts';})
        .catch(err => alert('err: ' + err));

        
    }

    render(){
        return(
            <form encType="multipart/form-data" onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Post title</label>
                    <input type="text" required className="form-control" value={this.state.post_title} onChange={this.onChangeTitle} name="post_title" />
                </div>
                <div className="form-group">
                    <label htmlFor="post_category">Post category</label>
                    <select name="post_category" id="" required value={this.state.post_category} onChange={this.onChangeCategory}>
                    {
                                this.state.post_categories.map(function(cat){
                                    return <option key={cat}
                                    value={cat}>{cat}
                                    </option>
                                })
                            }
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="title">Post Author</label>
                    <input type="text" className="form-control" name="post_author" required value={this.state.post_author} onChange={this.onChangeAuthor} />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Post status</label>
                    <input type="text" className="form-control" name="post_status" required value={this.state.post_status} onChange={this.onChangeStatus}/>
                </div>
                <div className="form-group custom-file">
                    <label htmlFor="post_image">Post image</label>
                    <img width="100" src={this.state.pic} alt={this.state.post_image} className='img-fluid'></img>
                    <input type="file" name="post_image" className="form-control-file" files={this.state.post_image} onChange={this.onChangeImage} />
                </div>
                {/* <div className="form-group custom-file mb-3">
                    <label htmlFor="title">Post vidoe/audio</label>
                    <input type="file" className="form-control-file" name="post_file" required onChange={this.onChangeFile}/>
                </div> */}
                <div className="form-group">
                    <label htmlFor="title"><h5>Post content</h5></label>
                    {/* <textarea name="post_content" className="form-control" id="" cols="30" rows="10" required value={this.state.post_content} onChange={this.onChangeContent}>
                    </textarea> */}
                    <ReactQuill theme="snow"  modules={this.modules}
                    formats={this.formats}  onChange={this.rteChange}
                    value={this.state.richtext || ''}/>
                </div>
                <div className='form-group'>
                        <label>Post Date: </label>
                        <div>
                            <DatePicker
                            selected={this.state.post_date}
                            onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                <div className="form-group">
                    <button className="btn btn-primary" type='submit' onClick={this.onPost} >Update</button>
                </div>
            </form>
        )
    }
}