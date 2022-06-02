import React from "react";
// import Image from "next/image";

import classes from './login-signup-cont.module.scss';
// import SignupPanel from "./signup-panel.component";
// import LoginPanel from "./login-panel.component";

type LoginSignupContainerProps = {
    children: JSX.Element
}

const LoginSignupContainer = ({ children }: LoginSignupContainerProps) => {
    return (
        <section className={classes.login_signup_bg} >
            <div className={classes.login_signup_container}>
                {children}
            </div>
        </section>
    )
}

export default LoginSignupContainer;