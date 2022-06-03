import React from 'react';
import Image from 'next/image';
import { IoLogoFacebook, IoLogoTwitter, IoMail, IoLogoYoutube, IoLogoInstagram } from "react-icons/io5";

import classes from './footer.module.scss';
import { Flex, Image as ChakraImage } from '@chakra-ui/react';

const Footer = () => {
    return (
        <section className={classes.footer} id='footer'>
            <div className={classes.footer_top}>
                <div>
                    <Image className={classes.footer_logo} src="/images/EcoSense LogoType@2x.png" alt="Logo" width={290} height={150}/>
                </div>
                <div className={classes.footer_top_textbox}>
                    <div className={classes.footer_top_1}>
                        <p className={classes.f_info_text_light}>EcoSense</p>
                        <p className={classes.f_info_text}>
                        We are creating a bridge for environmental activists in raising awareness 
                        about environmental health problems to the general public and to help them implement an environmentally friendly 
                        lifestyle more effectively and efficiently together.
                        </p>
                        <p className={classes.f_info_text}>
                        Contact us: ecosense.id@gmail.com
                        </p>
                    </div>
                    <div className={classes.footer_top_2}>
                        <p className={classes.f_info_text_light}>
                            Bangkit Academy 2022
                        </p>
                        <p className={classes.f_info_text}>
                            A collaboration project of EcoSense Team
                            from Universitas Indonesia (UI), Universitas Jambi (UNJA), Universitas Pelita Harapan (UPH), and UPN Veteran Yogyakarta.
                        </p>
                        <Flex mt={10} mb={5} justifyContent={['center', 'center', 'flex-start']} gap={[1, 2, 5]}>
                            <ChakraImage draggable={false} maxH={14} src='/images/logo-ui.png' alt='Logo UI'/>
                            <ChakraImage draggable={false} h={14} src='/images/logo-unja_.png' alt='Logo UI'/>
                            <ChakraImage draggable={false} h={14} src='/images/logo-uph.png' alt='Logo UI'/>
                            <ChakraImage draggable={false} h={14} src='/images/logo-upnvy_.png' alt='Logo UI'/>
                        </Flex>
                    </div>
                </div>
            </div>
            
            <div className={classes.footer_iconbox}>
                <IoLogoFacebook size="small" name="logo-facebook" className={classes.footer_icon}></IoLogoFacebook>
                <IoLogoTwitter name="logo-twitter" className={classes.footer_icon}></IoLogoTwitter>
                <a href="mailto:ecosense.id@gmail.com"><IoMail name="mail" className={classes.footer_icon}></IoMail></a>
                <IoLogoYoutube name="logo-youtube" className={classes.footer_icon}></IoLogoYoutube>
                <IoLogoInstagram name="logo-instagram" className={`${classes.footer_icon} ${classes.last_icon}`}></IoLogoInstagram>
            </div>
            <div className={classes.footer_btm}>Copyright &copy; 2022 EcoSense. Bangkit Academy 2022. All rights reserved.</div>
        </section>
    )
}

export default Footer;