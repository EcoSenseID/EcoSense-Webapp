import React, { Fragment } from "react";

import MainNavigation from "./main-nav.component";

const Layout = (props) => {
    return (
        <Fragment>
            <MainNavigation />
            <main>{props.children}</main>
        </Fragment>
    )
}

export default Layout;