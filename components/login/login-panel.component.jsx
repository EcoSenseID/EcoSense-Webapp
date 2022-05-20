import React, { useState } from "react";
import { useRouter } from 'next/router';
import CustomButton from "../ui/custom-btn.component";
import FormInput from "../ui/form-input.component";

import classes from './login-panel.module.scss';

import { emailLogIn, logInWithGoogle } from "../../firebase/firebase.util";

const LoginPanel = () => {
    // React Hooks
    const [userCredentials, setCredentials] = useState({ 
        email: '', 
        password: '' 
    });
    const { email, password } = userCredentials;
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const res = await emailLogIn(email, password);
        if (res.status == 200) {
            router.push('/dashboard');
        } else {
            alert(res.message);
        }
    }

    const handleSubmitGoogle = async() => {
        const res = await logInWithGoogle();
        if (res.status == 200) {
            router.push('/dashboard');
        } else {
            alert(res.message);
        }
    }

    const handleChange = (event) => {
        const { value, name } = event.target;

        setCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className={classes.log_in}>
            <h2 className={classes.title}>I already have an account</h2>
            <span className={classes.subtitle}>Log in with your email and password.</span>

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
                    <CustomButton type="button" isgooglesignin="true" onClick={handleSubmitGoogle}>Google Log In</CustomButton>
                </div>
            </form>
        </div>
    )
}

export default LoginPanel;