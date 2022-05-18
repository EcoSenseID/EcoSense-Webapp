import React from "react";
import Link from "next/link";

import Logo from "./logo.component";
import classes from './main-nav.module.css';

const MainNavigation = () => {
    return (
        <header className={classes.header}>
            <Link href='/'>
                <a className={classes.logobox}><Logo /></a>
            </Link>
            <nav>
                <ul>
                    <li><Link href='/'>Home</Link></li>
                    <li><Link href='/'>About Us</Link></li>
                    <li><Link href='/'>Media</Link></li>
                    <li><Link href='/'>Features</Link></li>
                    <li><Link href='/'>Contact</Link></li>
                    <li className={classes.login}><Link href='/login'>Log In</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;