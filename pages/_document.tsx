import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

type Props = {};

class MyDocument extends NextDocument<Props> {
    render() {
        return (
            <Html lang='en' style={{scrollBehavior:'smooth'}}>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;