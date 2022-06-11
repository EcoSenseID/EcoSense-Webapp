import React from "react";
import { Image, useColorModeValue } from "@chakra-ui/react";

const Logo = () => {
    return (
        <Image
            src={useColorModeValue(`/images/ecosense-logos/EcoSense LogoType-light.png`, `/images/ecosense-logos/EcoSense LogoType-dark.png`)} 
            maxH={'50px'} alt={'EcoSense'}
        />
    );
}

export default Logo;