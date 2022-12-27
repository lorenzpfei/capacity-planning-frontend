import React from 'react';
import styles from './header.module.scss'
import Image from 'next/image'

const Header = () => {
    return (
        <header className={`${styles.header}`}>
            <div className="logo side container-text">
                <Image src="/next.svg" alt="Avatar" width={150} height={100}></Image>
            </div>
            <div className={`${styles.headerContent} container-text`}>
                <div>
                    placeholder
                </div>
                <div className={`container-text`}>
                    test
                </div>
            </div>
        </header>
    );
};

export default Header;