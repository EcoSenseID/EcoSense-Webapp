import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Logo from "./logo.component";
import classes from './main-nav.module.scss';

import { AuthContext } from "../../firebase/context";
import { logOutFirebase } from "../../firebase/firebase.util";

const MainNavigation = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const handleLogOut = async () => {
        const res = await logOutFirebase();
        if (res.status == 200) {
            router.push('/');
        } else {
            alert(res.message);
        }
    }
    
    return (
        <header className={classes.header}>
            <Link href='/'>
                <a className={classes.logobox}><Logo /></a>
            </Link>
            <nav className={classes.navbox}>
                <ul>
                    <li><Link href='/'>Home</Link></li>
                    <li><Link href='#about'>About Us</Link></li>
                    <li><Link href='#campaigns'>Campaigns</Link></li>
                    <li><Link href='#footer'>Contact</Link></li>
                    <li className={classes.login}>
                        {
                            user ?
                            <a onClick={handleLogOut}>Log Out</a> :
                            <Link href='/login'>Log In</Link>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;