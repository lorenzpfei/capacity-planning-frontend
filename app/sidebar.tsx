'use client';

import Link from 'next/link';
import {useSelectedLayoutSegment} from 'next/navigation';
import React, {useState} from 'react';
import {navigation, NavigationItem} from "../lib/navigation";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    return (
        <nav className={`${styles.nav} side`}>
            <div className={'container-text '}>
                {navigation.map((section) => {
                    return (
                        <div key={section.name}>
                            <div className={styles.item}>
                            {section.childs === undefined ? (
                                    <Link
                                        onClick={close}
                                        href={`/${section.slug}`}>
                                        <FontAwesomeIcon icon={section.icon} className={styles.icon}/> {section.name}
                                    </Link>
                                ) :
                                (
                                    <div><FontAwesomeIcon icon={section.icon} className={styles.icon}/> {section.name}</div>
                                )}
                            </div>

                            <div className="space-y-1">
                                {section.childs ? section.childs.map((item) => (
                                    <SubNav key={item.slug} item={item} close={close}/>
                                )) : null}
                            </div>
                        </div>
                    );
                })}
                <div className={`${styles.profile}`}>
                    <Image src="/next.svg" alt="Avatar" width={35} height={35}></Image>
                    <div className="user-info">
                        <div className="name">Lorenz Pfeifer</div>
                        <div className="desc">Lead Developer</div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

function SubNav({
                item,
                close,
            }: {
    item: NavigationItem;
    close: () => false | void;
}) {
    const segment = useSelectedLayoutSegment();
    const isActive = item.slug === segment;

    return (
        <div className={`${styles.item} ${isActive ? "active" : ""}`}>
            <Link
                onClick={close}
                href={`/${item.slug}`}>
                <FontAwesomeIcon icon={item.icon} className={styles.icon}/> {item.name}
            </Link>
        </div>
    );
}