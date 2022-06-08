import React from "react";
import { Image, useColorModeValue } from "@chakra-ui/react";

import classes from './logo.module.scss';

const Logo = () => {
    return (
        <Image 
            className={classes.logopic} 
            src={useColorModeValue(`/images/EcoSense LogoType-1@2x.png`, `/images/EcoSense LogoType@2x.png`)} 
            height={'50px'} 
            alt={'Logo EcoSense'}
        />
    );
}

export default Logo;