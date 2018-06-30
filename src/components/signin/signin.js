import React, { Component } from 'react';
import styles from './signin.css';
import { firebase, googleAuth, facebookAuth, twitterAuth, githubAuth } from '../../firebase';

import FormField from '../widgets/FormFields/formFields';

class SignIn extends Component {

    state = {
        registerError:'',
        loading:false,
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'Enter your password'
                },
                validation:{
                    required:true,
                    password:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }

    updateForm = (element) => {
        const newFormdata = {
            ...this.state.formdata
        }
        const newElement = {
            ...newFormdata[element.id]
        }
        newElement.value = element.event.target.value;
        if(element.blur){
            let validData = this.validate(newElement);
            newElement.valid = validData[0];
            newElement.validationMessage = validData[1];   
        }
        newElement.touched = element.blur;
        newFormdata[element.id] = newElement;
        
        this.setState({
            formdata:newFormdata
        })
    }

    validate = (element) => {
        let error = [true,''];

        if(element.validation.email){
            const valid = /\S+@\S+\.\S+/.test(element.value);
            const message = `${!valid ? 'Must be a valid email':''}`;
            error = !valid ? [valid,message] : error
        }

        if(element.validation.password){
            const valid = element.value.length >= 5;
            const message = `${!valid ? 'Must be greater than 5':''}`;
            error = !valid ? [valid,message] : error
        }

        if(element.validation.required){
            const valid = element.value.trim() !=='';
            const message = `${!valid ? 'This field is required':''}`;
            error = !valid ? [valid,message] : error
        }

        return error;
    }

    submitForm = (event,type) => {
        event.preventDefault();

        if(type !== null){

            let dataToSubmit = {};
            let formIsValid = true;

            for(let key in this.state.formdata){
                dataToSubmit[key] = this.state.formdata[key].value
            }
            for(let key in this.state.formdata){
                formIsValid = this.state.formdata[key].valid && formIsValid;
            }

            if(formIsValid){
                this.setState({
                    loading:true,
                    registerError:''
                })
                if(type){
                    firebase.auth()
                    .signInWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(()=>{
                        this.props.history.push('/')
                    }).catch( error =>{
                        this.setState({
                            loading:false,
                            registerError: error.message
                        })
                    })

                } else {
                    firebase.auth()
                    .createUserWithEmailAndPassword(
                        dataToSubmit.email,
                        dataToSubmit.password
                    ).then(()=>{
                        this.props.history.push('/')
                    }).catch( error =>{
                        this.setState({
                            loading:false,
                            registerError: error.message
                        })
                    })
                }
            }
        }
    }

    googleAuth = () => {
        firebase.auth().signInWithPopup(googleAuth)
    }
    twitterAuth = () => {
        firebase.auth().signInWithPopup(twitterAuth)
    }
    githubAuth = () => {
        firebase.auth().signInWithPopup(githubAuth)
    }
    facebookAuth = () => {
        firebase.auth().signInWithPopup(facebookAuth)
    }

    submitButton = () => (
        this.state.loading ? 
            'loading...'
        :
        <div>
            <button className="fa fa-key btn btn-outline-info btn-sm" onClick={(event)=>this.submitForm(event,false)}> Register</button>
            <button className="fa fa-user btn btn-outline-info btn-sm ml-2" onClick={(event)=>this.submitForm(event,true)}> Log in </button>
        
            <div><br/>
                <h4 className="_14">Login With:</h4>
                <div className={styles.hover08}>
                    <a onClick={this.googleAuth} title="Login with Google">
                        <img alt="nba logo" src="/images/social-logos/google plus.png"/>
                    </a>
                    <a className="hvr-pulse-grow github social-icon" onClick={this.githubAuth} title="Login with Github">
                        <img alt="nba logo" src="/images/social-logos/twitter.png"/>
                    </a>
                    <a className="hvr-pulse-grow twitter social-icon" onClick={this.twitterAuth} title="Login with Twitter">
                        <img alt="nba logo" src="/images/social-logos/github.png"/>
                    </a>
                    <a className="hvr-pulse-grow linkedin social-icon" onClick={this.facebookAuth} title="Login with Facebook">
                        <img alt="nba logo" src="/images/social-logos/facebook.png"/>
                    </a>
                </div>
            </div>
        </div>
    )

    showError = () => (
        this.state.registerError !== '' ? 
            <div className={styles.error}>{this.state.registerError}</div>
        : ''
    )

    render(){
        return(
            <div className={styles.logContainer}>
                <form onSubmit={(event)=>this.submitForm(event,null)}>
                    <h2>Register / Log in</h2>

                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element)=>this.updateForm(element)}
                    />
                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element)=>this.updateForm(element)}
                    />

                    { this.submitButton() }
                    { this.showError() }
                </form>
            </div>
        )
    }
}

export default SignIn;