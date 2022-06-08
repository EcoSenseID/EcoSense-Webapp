import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import theme from '../theme';

type Props = {};

class MyDocument extends NextDocument<Props> {
    render() {
        return (
            <Html lang='en' style={{scrollBehavior:'smooth'}}>
                <Head />
                <body>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;