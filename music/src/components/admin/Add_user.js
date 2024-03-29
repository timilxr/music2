import React, {Component} from 'react';
import axios from 'axios';
// import { faDivide } from '@fortawesome/free-solid-svg-icons';

export default class AddUser extends Component{
    constructor(props){
        super(props);
        this.state={
            Firstname: '',
            Lastname: '',
            Email: '',
            Password: '',
            Category: 'Subscriber',
            isLoading: false,
            status: '',
            msg: '',
            userType: props.category
        };

        this.onChangeFirstname = this.onChangeFirstname.bind(this);
        this.onChangeLastname = this.onChangeLastname.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCategory = this.onChangeCategory.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    onChangeFirstname(e){
        this.setState({
            Firstname: e.target.value
        });
    }
    onChangeLastname(e){
        this.setState({
            Lastname: e.target.value
        });
    }
    onChangeCategory(e){
        this.setState({
            Category: e.target.value
        });
    }
    onChangeEmail(e){
        this.setState({
            Email: e.target.value
        });
    }
    onChangePassword(e){
        this.setState({
            Password: e.target.value
        });
    }
    onSubmit(e){
        // e.preventDefault();
    }
    addUser(){
        this.setState({
            isLoading: true
        });
        const {Firstname, Lastname, Email, Password, Category} = this.state;
        console.log(this.state);
        axios.post('/users/add',{
            firstname: Firstname, 
            lastname: Lastname, 
            email: Email, 
            password: Password, 
            category: Category})
        .then(res=>{
            console.log(res.data);
            this.setState({
                isLoading: false,
                status: 'alert-success',
                msg: res.data
            });
        }).catch(err=>{
            console.log(err);
            this.setState({
                isLoading: false,
                status: 'alert-danger',
                msg: err
            });
        });
    }


    render(){
        const {Firstname, Lastname, Email, Password, Category, status, msg, isLoading, userType} = this.state;
        if(isLoading){
            return(
                <h1>User is being Added</h1>
            )
        } else if(userType === 'Admin'){
            return(
                <div>
                    <h1>Add Users</h1>
                    <div className={`alert ${status}`} role='alert'>
                        {msg}
                    </div>
                    <form onSubmit={this.onSubmit} className="">
                        <div className='form-group'>
                            <label htmlFor='category'><h5>Category</h5></label>
                            <select name='category' className='form-control' value={Category} onChange={this.onChangeCategory} required>
                                <option value='Subscriber'>Subscriber</option>
                                <option value='Admin'>Admin</option>
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='fisrtname'><h5>First name</h5></label>
                            <input type='text' name='firstname' className='form-control' value={Firstname} onChange={this.onChangeFirstname} placeholder='Firstname' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='lastname'><h5>Last name</h5></label>
                            <input type='text' name='lastname' className='form-control' value={Lastname} onChange={this.onChangeLastname} placeholder='Lastname' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='email'><h5>Email</h5></label>
                            <input type='email' name='email' className='form-control' value={Email} onChange={this.onChangeEmail} placeholder='email@gmail.com' required />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='password'><h5>Password</h5></label>
                            <input type='password' name='password' className='form-control' value={Password} onChange={this.onChangePassword} placeholder='Password' required />
                        </div>
                        <div className='form-group'>
                            <button type='button' className='btn btn-primary btn-block' onClick={this.addUser}><h5>Add User</h5></button>
                        </div>
                    </form>
                </div>
            )
        } else {
            return(
                <h1>Only Admins Can Add New Users</h1>
            )
        }
    }
}