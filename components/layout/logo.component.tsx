import React from "react";
import { Image, useColorModeValue } from "@chakra-ui/react";

const Logo = () => {
    return (
        <Image
            src={useColorModeValue(`/images/EcoSense LogoType-1@2x.png`, `/images/EcoSense LogoType@2x.png`)} 
            maxH={'50px'} alt={'Logo EcoSense'}
        />
    );
}

export default Logo;