import React, { useState } from "react";
import { IoChevronUpOutline } from "react-icons/io5";

import classes from './scroll-up-btn.module.css';

const ScrollUpBtn = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 20)  setVisible(true);
        else if (scrolled <= 20)  setVisible(false);
    };

    const scrollToTop = () =>{
        if (typeof window !== "undefined") {
            window.scrollTo({
                top: 0, 
                behavior: 'smooth'
            });
        }
    };
    
    if (typeof window !== "undefined") {
        window.addEventListener('scroll', toggleVisible);
    }

    return (
        <a className={classes.scroll} title="Go to top" href="#home" style={{ display: visible ? 'inline' : 'none' }} onClick={scrollToTop}>
            <IoChevronUpOutline className={classes.iconscroll}></IoChevronUpOutline>
        </a>
    )
}

export default ScrollUpBtn;