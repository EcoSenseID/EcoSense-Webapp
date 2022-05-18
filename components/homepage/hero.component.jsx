import React from "react";
import Image from "next/image";

import classes from './hero.module.css';

const Hero = () => {
    return (
        <section className={classes.hero}>
            <div className={classes.image}>
                <Image src='/images/site/img9.jpg' alt='An image showing Ken' width={300} height={300} />
            </div>
            <h1>Hi, I&apos;m Ken!</h1>
            <p>I blog about web development - especially front-end frameworks like React.</p>
        </section>
    )
}

export default Hero;