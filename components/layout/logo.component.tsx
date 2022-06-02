import React from "react";
import Image from "next/image";

import classes from './logo.module.scss';

const Logo = () => {
    return (
        <>
            <Image className={classes.logopic} src={`/images/EcoSense-logo-png.png`} height={'40px'} width={'40px'} alt={'Logo EcoSense'}></Image>
            <div className={classes.logo}>EcoSense</div>
        </>
    );
}

export default Logo;