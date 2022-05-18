import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Logo from "./logo.component";
import classes from './main-nav.module.css';

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
            <nav>
                <ul>
                    <li><Link href='/'>Home</Link></li>
                    <li><Link href='/'>About Us</Link></li>
                    <li><Link href='/'>Media</Link></li>
                    <li><Link href='/'>Features</Link></li>
                    <li><Link href='/'>Contact</Link></li>
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