import React, {Component} from 'react';
import axios from 'axios';

export default class Profile extends Component{
    constructor(props){
        super(props);
        this.state={
            signUpFirstname: '',
            signUpLastname: '',
            signUpEmail: '',
            signUpPassword: '',
            signUpPhone: '',
            signUpBio: '',
            signUpError: '',
            condition: false,
            category: ''
        };

        this.onSignUpChangeEmail = this.onSignUpChangeEmail.bind(this);
        this.onSignUpChangePassword = this.onSignUpChangePassword.bind(this);
        this.onSignUpChangeFirstname = this.onSignUpChangeFirstname.bind(this);
        this.onSignUpChangeLastname = this.onSignUpChangeLastname.bind(this);
        this.onSignUpChangePhone = this.onSignUpChangePhone.bind(this);
        this.onSignUpChangeBio = this.onSignUpChangeBio.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.allowEdit = this.allowEdit.bind(this);
    }

    componentDidMount(){
        axios.get('/users/email/'+ this.props.mail)
        .then(res=>{
            this.setState({
                signUpFirstname: res.data.firstname,
                signUpLastname: res.data.lastname,
                signUpEmail: res.data.email,
                category: res.data.category
            });
            console.log(this.props.mail);
            console.log(this.state.signUpFirstname);
        })
        .catch(err=>{console.log(err)});
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

    onSignUpChangeBio(e){
        this.setState({
            signUpBio: e.target.value
        });
    }

    onSignUpChangePhone(e){
        this.setState({
            signUpPhone: e.target.value
        });
    }


    allowEdit(){
        this.setState({
            condition: true
        });
    }

    editProfile(){
        const {
            signUpError,
            signUpFirstname,
            signUpLastname,
            signUpEmail,
            signUpPassword,
            signUpPhone,
            signUpBio
            // redirect
         } = this.state;
        if(this.state.condition){return( <div className="card">
        <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <form onSubmit={this.onSubmit} className="py-3 px-4 px-md-5 bg-dark text-info rounded card-text">
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
                                <input type='tel' placeholder='08128763241' className='form-control bg-transparent text-info'
                                value={signUpPhone} onChange={this.onSignUpChangePhone}
                                />
                            </div>
                            <div className='form-group'>
                                <input type='text' placeholder='I am a writer' className='form-control bg-transparent text-info'
                                value={signUpBio} onChange={this.onSignUpChangeBio}
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
        </div>)}
        return(
        <button className="btn btn-primary" onClick={()=>{this.allowEdit()}}>Edit Profile</button>
        )
    }

    onSignUp(){
        const { 
            signUpFirstname,
            signUpLastname,
            signUpEmail,
            signUpPassword,
            signUpBio,
            signUpPhone
         } = this.state;

         axios.post('/users/update_profile/' + this.props.mail,{
             firstname: signUpFirstname,
             lastname: signUpLastname,
             email: signUpEmail,
             phone: signUpPhone,
             bio: signUpBio,
             password: signUpPassword,
             category: 'Subscriber'
         })
            .then(res=>{
                console.log(res.data);
                this.setState({
                    signUpError: res.data,
                    isLoading: false
                });
                alert(res.data);
            })
            .catch(err=>{
                console.log('Error: '+ err);
                this.setState({
                    signUpError: err,
                    isLoading: false
                });
                alert(this.state.signInError);

            }
            )
    }

    onSubmit(e){
        e.preventDefault();
    }

    render(){
        // id  = require(`../../images/${name}`);
        // const {info} = this.state;
        // const email = info.email;
        // console.log(info[0].email);
        const {
            signUpError,
            signUpFirstname,
            signUpLastname,
            signUpEmail,
            signUpPassword,
            // redirect
         } = this.state;

        return(
            <div>
                <div className="card mx-auto" style={{width: 50 +'%'}}>
                <img className="card-img-top img-fluid" src=".../100px180/?text=Image cap" alt="Card image cap" />
                <div className="card-body text-center">
                    <h3 className="card-title text-capitalize">{this.props.name}</h3>
                    <h5 className="card-subtitle text-capitalize">{this.state.category}</h5>
                    <h5 className="card-subtitle text-capitalize">{this.state.signUpEmail}</h5>
                    {/* <h5 className="card-subtitle text-capitalize">{this.state.phone}</h5> */}
                    {/* <p className="card-text">{this.state.bio}</p> */}
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
                <div className="card-footer text-right">
                <a href="#" className="btn btn-primary">Go somewhere</a>

                </div>
            </div>
            {this.editProfile()}
           
            </div>
        )
    }
}