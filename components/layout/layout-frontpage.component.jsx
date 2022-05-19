import React, { Fragment } from "react";
import Footer from "./footer.component";

import MainNavigation from "./main-nav.component";

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation />
            <main>{props.children}</main>
            <Footer />
        </Fragment>
    )
}

export default Layout;