import React, {Component} from 'react';
// import {BrowserRouter as Router, Route} from 'react-router-dom';
import axios from 'axios';
import { getFromStorage, setInStorage } from '../../utils/storage';

// import Dashboard from './dashboard';
import Header from './header';

export default class Login extends Component {
    constructor(props){
        super(props);
        console.log(props.match.url);
        this.state ={
            link: props.match.url,
            path: props.match.path,
            isLoading: true,
            token: '',
            signUpError: '',
            signInError: '',
            signInEmail: '',
            signInPassword: '',
            signUpFirstname: '',
            signUpLastname: '',
            signUpEmail: '',
            signUpPassword: ''
        };

        this.onSignInChangeEmail = this.onSignInChangeEmail.bind(this);
        this.onSignInChangePassword = this.onSignInChangePassword.bind(this);
        this.onSignUpChangeEmail = this.onSignUpChangeEmail.bind(this);
        this.onSignUpChangePassword = this.onSignUpChangePassword.bind(this);
        this.onSignUpChangeFirstname = this.onSignUpChangeFirstname.bind(this);
        this.onSignUpChangeLastname = this.onSignUpChangeLastname.bind(this);

        this.onSignIn = this.onSignIn.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.logout = this.logout.bind(this);
        
    }

    componentDidMount(){
        const obj = getFromStorage('the_main_app');

        if(obj && obj.token){
            const {token} = obj;
            console.log(token);
            axios.get('http://localhost:5001/users/verify/'+ token)
            .then(res=>{
                // console.log(res.data.message);
                if (res.data.message !== 'deleted') {
                    this.setState({
                        token: token,
                        isLoading: false
                    });
                }
                this.setState({
                    isLoading: false
                });
            })
            .catch(err=>{
                console.log(err);
                this.setState({
                    isLoading: false
                });
            }
            )

        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    onSignInChangeEmail(e){
        this.setState({
            signInEmail: e.target.value
        });
    }

    onSignInChangePassword(e){
        this.setState({
            signInPassword: e.target.value
        });
    }

    onSignUpChangeFirstname(e){
        this.setState({
            signUpFirstname: e.target.value
        });
    }

    onSignUpChangeLastname(e){
        this.setState({
            signUpLastname: e.target.value
        });
    }

    onSignUpChangeEmail(e){
        this.setState({
            signUpEmail: e.target.value
        });
    }

    onSignUpChangePassword(e){
        this.setState({
            signUpPassword: e.target.value
        });
    }

    onSignIn(){
        const { 
            signInEmail,
            signInPassword
         } = this.state;

         axios.post('http://localhost:5001/users/signin',{
             email: signInEmail,
             password: signInPassword
         })
            .then(res=>{
                console.log(res);
                setInStorage('the_main_app', {token: res.data.token})
                this.setState({
                    signInError: res.data.message,
                    isLoading: false,
                    signInPassword: '',
                    signInEmail: ''
                });
                this.componentDidMount();
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    signInError: err,
                    isLoading: false
                });
            }
            )
    }

    logout(){
        this.setState({
            isLoading: true
        });
        const obj = getFromStorage('the_main_app');

        if(obj && obj.token){
            const {token} = obj;
            console.log(token);
            axios.get('http://localhost:5001/users/logout/'+ token)
            .then(res=>{
                console.log(res.data);
                if (res.data === 'session is deleted') {
                    this.setState({
                    token: '',
                    isLoading: false
                    });
                }
                this.setState({
                    isLoading: false
                    });
            })
            .catch(err=>{
                console.log(err);
                this.setState({
                    isLoading: false
                });}
            )

        } else {
            this.setState({
                isLoading: false
            });
        }
    }

    onSubmit(e){
        e.preventDefault();
    }

    onSignUp(){
        const { 
            signUpFirstname,
            signUpLastname,
            signUpEmail,
            signUpPassword
         } = this.state;

         axios.post('http://localhost:5001/users/add',{
             firstname: signUpFirstname,
             lastname: signUpLastname,
             email: signUpEmail,
             password: signUpPassword
         })
            .then(res=>{
                console.log(res.data);
                this.setState({
                    signUpError: res.data,
                    isLoading: false
                });
            })
            .catch(err=>{
                console.log('Error: '+ err);
                this.setState({
                    signUpError: err,
                    isLoading: false
                });
            }
            )
    }

    render(){
        const { link,
                path,
                isLoading,
                signInEmail,
                token,
                signInPassword,
                signInError,
                signUpError,
                signUpFirstname,
                signUpLastname,
                signUpEmail,
                signUpPassword
             } = this.state;
        if (isLoading){
            return(<div><p>Loading...</p></div>);
        }
        if (!token){
            return(
                <div className="bg-info bg-cover">
                    <div className="bg-dark elevation-5 p-3 mb-3">
                        <h2 className="text-center text-info">Hello, Welcome to Our Blog!</h2>
                    </div>
                    <div className="row mt-5 mt-md-3 mt-lg-5">
                        <div className="col-md-6 p-4 px-md-5 m-auto">
                            <form onSubmit={this.onSubmit} className="py-5 px-4 px-md-5 bg-dark text-info rounded">
                            <h4 className="text-center mb-3"><b>Sign In</b></h4>
                            {/* {(signInError) ? (<p>{signInError}</p>) : (null)} */}
                                <div className='form-group'>
                                    <input type='email' placeholder='Email.Gmail.com' required className='form-control bg-transparent text-info'
                                    value={signInEmail} onChange={this.onSignInChangeEmail}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input type='password' placeholder='Password' required className='form-control bg-transparent text-info'
                                    value={signInPassword} onChange={this.onSignInChangePassword}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input type='submit' value='Sign In' className='btn btn-info btn-block' onClick={this.onSignIn} />
                                </div>
                            </form>
                            <br />
                        </div>
                        {/* <div className="col-md-2">&nbsp;</div> */}
                        <div className="col-md-6 p-4 p-md-5">
                            <form onSubmit={this.onSubmit} className="py-3 px-4 px-md-5 bg-dark text-info rounded">
                            <h4 className="mb-3 text-center"><b>Sign Up</b></h4>
                            {(signUpError) ? (<p>{signUpError}</p>) : (null)}
                            <div className='form-group'>
                                    <input type='text' placeholder='First name' required className='form-control bg-transparent text-info'
                                    value={signUpFirstname} onChange={this.onSignUpChangeFirstname}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input type='text' placeholder='Last name' required className='form-control bg-transparent text-info'
                                    value={signUpLastname} onChange={this.onSignUpChangeLastname}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input type='email' placeholder='Email.Gmail.com' required className='form-control bg-transparent text-info'
                                    value={signUpEmail} onChange={this.onSignUpChangeEmail}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input type='password' placeholder='Password' required className='form-control bg-transparent text-info'
                                    value={signUpPassword} onChange={this.onSignUpChangePassword}
                                    />
                                </div>
                                <div className='form-group'>
                                    <input type='submit' value='Sign Up' onClick={this.onSignUp} className='btn btn-info btn-block' />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        return(
            // <Dashboard />
            <Header  logout={this.logout} link={link} path={path} />
            // {/* <Footer /> */}
            
        )
    }
}