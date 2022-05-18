import React, { useState } from "react";
import { emailSignUp } from "../../firebase/firebase.util";
import CustomButton from "../ui/custom-btn.component";
import FormInput from "../ui/form-input.component";

import classes from './signup-panel.module.scss';

const SignupPanel = () => {
    // React Hooks
    const [userCredentials, setCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(userCredentials);
        
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            return;
        }
        emailSignUp({ displayName, email, password });
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setCredentials({...userCredentials, [name]: value });
    }

    return (
        <div className={classes.sign_up}>
            <h2 className={classes.title}>I do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit} className="sign-up-form">
                <FormInput
                    type="text"
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    label="Display Name"
                    required    
                />
                <FormInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    required    
                />
                <FormInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="Password"
                    required    
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    label="Confirm Password"
                    required    
                />
                <div className={classes.buttons}>
                    <CustomButton type='submit'>Sign Up</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default SignupPanel;