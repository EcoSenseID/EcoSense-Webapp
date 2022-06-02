import React, { Fragment } from "react";
import Footer from "./footer.component";

import MainNavigation from "./main-nav.component";

type LayoutProps = {
    children: JSX.Element | JSX.Element[]
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Fragment>
            <MainNavigation />
            <main>{children}</main>
            <Footer />
        </Fragment>
    )
}

export default Layout;