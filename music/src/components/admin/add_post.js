import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';

// import {Link} from 'react-router-dom';

export default class AddPost extends Component{
    constructor(props){
        super(props);
        console.log(props.name);
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
        // this.onChangeAuthor = this.onChangeAuthor.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        // this.onChangeFile = this.onChangeFile.bind(this);
        this.onChangeContent = this.onChangeContent.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onPost = this.onPost.bind(this);
        this.rteChange = this.rteChange.bind(this);

        this.state={
            post_title: '',
            post_categories: [],
            post_category: '',
            post_author: props.name,
            post_authormail: props.mail,
            post_status: '',
            post_image: null,
            // post_file: null,
            post_content: '',
            post_date: new Date(),
            richtext: ''
        }
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
        axios.get('/categories/')
        .then(response => {
            if (response.data.length > 0){
                this.setState({
                    post_categories: response.data.map(cat=>cat.category),
                    post_category: response.data[0].category
                });
            } else console.log('no data found');
        });
        console.log(this.state.post_author);
        
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
    }
    // onChangeAuthor(e){
    //     this.setState({
    //         post_author: e.target.value
    //     });
    // }
    onChangeStatus(e){
        this.setState({
            post_status: e.target.value
        });
    }
    onChangeImage(e){
        this.setState({
            post_image: e.target.files[0]
        });
        console.log(e.target.files[0]);
    }
    onChangeContent(e){
        this.setState({
            post_content: e.target.value
        });
    }
    onChangeDate(date){
        this.setState({
            post_date: date
        });
    }
    onSubmit(e){
        e.preventDefault();
    }
    onPost(){
        
        const posts = {
            post_title: this.state.post_title,
            post_category: this.state.post_category,
            post_author: this.state.post_author,
            post_authormail: this.state.post_authormail,
            post_status: this.state.post_status,
            post_image: this.state.post_image,
            post_content: this.state.richtext,
            post_date: this.state.post_date
        };
        console.log(posts);
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };


        const formdata = new FormData();
        formdata.append('image', this.state.post_image);
        formdata.append('post_title', this.state.post_title);
        formdata.append('post_category', this.state.post_category);
        formdata.append('post_author', this.state.post_author);
        formdata.append('post_authormail', this.state.post_authormail);
        formdata.append('post_status', this.state.post_status);
        formdata.append('post_content', this.state.richtext);
        formdata.append('post_date', this.state.post_date);
        console.log(formdata);
        
        axios.post('/posts/add', formdata, config)
        .then(res => {console.log(res.data);alert("The file is successfully uploaded. New Post Added.");window.location = '/admin/view_posts';})
        .catch(err => alert('err: ' + err));

    }

    render(){
        return(
            <form encType="multipart/form-data" onSubmit={this.onSubmit} className="px-5">
                <div className="form-group">
                    <label htmlFor="title"><h5>Post title</h5></label>
                    <input type="text" required className="form-control" value={this.state.post_title} onChange={this.onChangeTitle} name="post_title" />
                </div>
                <div className="form-group">
                    <label htmlFor="post_category"><h5>Post category</h5></label>
                    <select className="form-control" name="post_category" id="" required value={this.state.post_category} onChange={this.onChangeCategory}>
                    {
                                this.state.post_categories.map(function(cat){
                                    return <option key={cat}
                                    value={cat}>{cat}
                                    </option>
                                })
                            }
                    </select>
                </div>
                {/* <div className="form-group">
                    <label htmlFor="title"><h5>Post Author</h5></label>
                    <input type="text" className="form-control" name="post_author" required value={this.state.post_author} onChange={this.onChangeAuthor} />
                </div> */}
                <div className="form-group">
                    <label htmlFor="title"><h5>Post status</h5></label>
                    <input type="text" className="form-control" name="post_status" required value={this.state.post_status} onChange={this.onChangeStatus}/>
                </div>
                <div className="form-group custom-file">
                    <label htmlFor="post_image"><h5>Post image</h5></label>
                    <input type="file" name="post_image" className="form-control-file" required onChange={this.onChangeImage} />
                </div>
                {/* <div className="form-group custom-file mb-3">
                    <label htmlFor="title">Post vidoe/audio</label>
                    <input type="file" className="form-control-file" name="post_file" required onChange={this.onChangeFile}/>
                </div> */}
                <div className="form-group">
                    <label htmlFor="title"><h5>Post content</h5></label>
                    {/* <textarea name="post_content" className="form-control" id="" cols="30" rows="10" required value={this.state.post_content} onChange={this.onChangeContent}>
                    </textarea> */}
                    <ReactQuill theme="snow" required modules={this.modules}
                    formats={this.formats}  onChange={this.rteChange}
                    value={this.state.richtext || ''}/>
                </div>
                <div className='form-group'>
                        <label><h5>Post Date: </h5></label>
                        <div>
                            <DatePicker
                            selected={this.state.post_date}
                            onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                <div className="form-group">
                    <button className="btn btn-primary text-center mx-auto" type='submit' onClick={this.onPost} ><h5>Post</h5></button>
                </div>
            </form>
        )
    }
}