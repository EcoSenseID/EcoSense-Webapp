import React, { useState } from "react";
import CustomButton from "../ui/custom-btn.component";
import FormInput from "../ui/form-input.component";

import classes from './login-panel.module.scss';

const LoginPanel = () => {
    // React Hooks
    const [userCredentials, setCredentials] = useState({ 
        email: '', 
        password: '' 
    });

    const { email, password } = userCredentials;
    const handleSubmit = async (event) => {
        event.preventDefault();
        emailSignInStart(email, password);
    }

    const handleChange = (event) => {
        const { value, name } = event.target;

        setCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className={classes.log_in}>
            <h2 className={classes.title}>I already have an account</h2>
            <span>Log in with your email and password.</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    type="email" 
                    name="email" 
                    value={email} 
                    handleChange={handleChange}
                    label="Email"
                    required 
                />
                <FormInput 
                    type="password" 
                    name="password" 
                    value={password} 
                    handleChange={handleChange}
                    label="Password"
                    required 
                />
                <div className={classes.buttons}>
                    <CustomButton type="submit">Log In</CustomButton>
                    <CustomButton type="button" isGoogleSignIn>Log In with Google</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default LoginPanel;