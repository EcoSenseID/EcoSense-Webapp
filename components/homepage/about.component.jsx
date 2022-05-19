import React from "react";
import Image from 'next/image';

import classes from './about.module.scss';

const HomepageAbout = () => {
    return (
        <article className={classes.about} id='about'>
            <section className={classes.about_logo}>
                <Image alt="Logo" width={290} height={150} src={'/images/EcoSense LogoType-1@2x.png'}></Image>
            </section>
            <section className={classes.about_content}>
                <h2 className={classes.about_h_large}>Welcome to EcoSense, an application for saving the Earth. Find the best environmental campaigns and detect your plant problems here!</h2>
                <p className={classes.about_text}>
                    We are creating a bridge for environmental activists in raising awareness about environmental health problems to the general public and to help them implement an environmentally friendly lifestyle more effectively and efficiently together.
                </p>
            </section>
        </article>
    )
}

export default HomepageAbout;