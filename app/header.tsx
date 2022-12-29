import React from 'react';
import styles from './header.module.scss'

const Header = () => {
    return (
        <header className={`${styles.header}`}>
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