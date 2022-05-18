import React from "react";
import Image from "next/image";

import classes from './hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.header_btm}>
                <h1 className={classes.header_heading}>
                    Welcome to EcoSense!
                </h1>
                <p className={classes.header_sub}>
                    Save Earth, Save Lives.
                </p>
            </div>
        </section>
    )
}

export default Hero;