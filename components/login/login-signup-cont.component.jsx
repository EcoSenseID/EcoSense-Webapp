import React from "react";
import Image from "next/image";

import classes from './login-signup-cont.module.scss';
import SignupPanel from "./signup-panel.component";
import LoginPanel from "./login-panel.component";

const LoginSignupContainer = () => {
    return (
        <section className={classes.login_signup_bg} >
            <div className={classes.login_signup_container}>
                <LoginPanel />
                <SignupPanel />
            </div>
        </section>
    )
}

export default LoginSignupContainer;