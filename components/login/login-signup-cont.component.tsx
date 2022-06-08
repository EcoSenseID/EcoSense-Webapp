import { Flex, LightMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";
// import Image from "next/image";

import classes from './login-signup-cont.module.scss';
// import SignupPanel from "./signup-panel.component";
// import LoginPanel from "./login-panel.component";

type LoginSignupContainerProps = {
    children: JSX.Element | JSX.Element[]
}

const LoginSignupContainer = ({ children }: LoginSignupContainerProps) => {
    return (
        <LightMode>
            <section className={classes.login_signup_bg} >
                <Flex className={classes.login_signup_container} bgGradient={useColorModeValue('linear(to-b, green.50, white)', 'linear(to-l, gray.700, gray.800)')}>
                    {children}
                </Flex>
            </section>
        </LightMode>
    )
}

export default LoginSignupContainer;