import {AppProps} from 'next/app';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from '@mantine/core';
import Layout from "@/components/Layout/Layout";
import '@tremor/react/dist/esm/tremor.css'
import {useState} from "react";
import {getCookie, setCookie} from 'cookies-next';
import {GetServerSidePropsContext} from "next";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
    const {Component, pageProps} = props;
    const [colorScheme, setColorScheme] = useState<ColorScheme>(props.colorScheme);

    const toggleColorScheme = (value?: ColorScheme) => {
        const nextColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
        setColorScheme(nextColorScheme);
        setCookie('mantine-color-scheme', nextColorScheme, {maxAge: 60 * 60 * 24 * 30});
    };

    return (
        <div>
            <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
                <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </MantineProvider>
            </ColorSchemeProvider>
        </div>
    );
}

App.getInitialProps = ({ctx}: { ctx: GetServerSidePropsContext }) => ({
    colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});