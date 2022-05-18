import React from "react";

import classes from './custom-btn.module.scss'

const CustomButton = ({ children, ...props }) => (
    <button className={`${classes.custom_button} ${props.isGoogleSignIn ? classes.google_sign_in : ''} ${props.inverted ? classes.inverted : ''}`} {...props}>
        {children}
    </button>
);

export default CustomButton;