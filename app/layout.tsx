import './globals.css'
import React from "react";
import { Sidebar } from './sidebar';
import Header from './header';
import { Inter } from '@next/font/google'

const inter = Inter({
    weight: '400',
    subsets: ['latin']
});

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="de" className={inter.className}>
            <body>
                <Header/>
                <main>
                    <Sidebar/>
                    <div className={'content container-text'}>{children}</div>
                </main>
            </body>
        </html>
    )
}
