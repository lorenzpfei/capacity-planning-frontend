import {AppProps} from 'next/app';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import Layout from "@/components/Layout/Layout";
import '@tremor/react/dist/esm/tremor.css'
import {useCallback, useState} from "react";
import {getCookie, setCookie} from 'cookies-next';
import {GetServerSidePropsContext} from "next";
import {api} from "@/lib/api";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
    const {Component, pageProps} = props;
    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);
    const [isLoggedIn, setLoggedIn] = useState((getCookie('user')));

    //todo: fix this
    const setUser = useCallback(() =>{
        api.get('/me').then((res) => {
            setCookie('user', res.data);
            setLoggedIn(true);
        }).catch(() => {
            setLoggedIn(false);
        })
    }, [])

    setUser();

    console.log('test'); //todo: remove debug

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        setCookie('mantine-color-scheme', nextColorScheme, {maxAge: 60 * 60 * 24 * 30});
    };

    return (
        <div>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                    {isLoggedIn ?
                        <Layout>
                            <Component {...pageProps} />
                        </Layout> :
                        <Component {...pageProps} />}
                </MantineProvider>
            </ColorSchemeProvider>
        </div>
    );
}

App.getInitialProps = ({ctx}: { ctx: GetServerSidePropsContext }) => ({
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});