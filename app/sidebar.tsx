'use client';

import Link from 'next/link';
import {useSelectedLayoutSegment} from 'next/navigation';
import React, {useState} from 'react';
import {navigation, NavigationItem} from "../lib/navigation";
import styles from "./sidebar.module.scss";
import Image from "next/image";
import {IconType} from "react-icons";
import {CgMenuLeft, CgMenuRight} from "react-icons/cg";
import {Collapse} from "@nextui-org/react";
import { Modal, useModal, Button, Text } from "@nextui-org/react";
import {IoOpenOutline} from "react-icons/io5";


const renderIcon = (icon: IconType | null, index: number) => {
    if (icon === null) return;
    const Icon = icon;
    return (
        <Icon className={styles.icon} key={index}/>
    );
};

export function Sidebar() {
    const [, setIsOpen] = useState(false);
    const close = () => setIsOpen(false);

    const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 1000);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    const { setVisible, bindings } = useModal();
    const handler = () => setVisible(true);

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    return (
        <nav className={`${styles.nav} side ${!isMenuOpen ? styles.collapse : ""}`}>
            <div className={`${styles.logo} side container-text`}>
                {isMenuOpen ?
                    <Image src="/next.svg" alt="Avatar" className={'logo-img'} width={100} height={100}></Image> : ''}
                <span onClick={toggleMenu} className={styles.button}>
                    {isMenuOpen ? renderIcon(CgMenuRight, 0) : renderIcon(CgMenuLeft, 0)}
                </span>
            </div>
            <div>
                {navigation.map((section, index) => {
                    return (
                        <div key={section.name}>
                            {section.childs === undefined ? (
                                    <Link className={styles.item}
                                          onClick={close}
                                          href={`/${section.slug}`}>
                                        {renderIcon(section.icon, index)} <span className="name">{isMenuOpen? section.name:''}</span>
                                    </Link>
                                ) :
                                (
                                    <Collapse.Group css={{
                                        padding: 0
                                    }}>
                                        <Collapse title={isMenuOpen? section.name:''} contentLeft={renderIcon(section.icon, index)}
                                                  className={styles.override}>
                                            <div>
                                                {section.childs ? section.childs.map((item) => (
                                                    <SubNav key={item.slug} item={item} close={close}/>
                                                )) : null}
                                            </div>
                                        </Collapse>
                                    </Collapse.Group>
                                )}
                        </div>
                    );
                })}
                <div className={`${styles.profile}`} onClick={handler}>
                    <Image src="/next.svg" alt="Avatar" width={35} height={35}></Image>
                    <div className="user-info">
                        <div className="name">Lorenz Pfeifer</div>
                        <div className="desc">Lead Developer {renderIcon(IoOpenOutline, 0)}</div>
                    </div>
                </div>
                <Modal
                    scroll
                    width="600px"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    {...bindings}
                >
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            Abmelden
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Text id="modal-description">
                            Angemeldet als
                        </Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto flat color="error" onClick={() => setVisible(false)}>
                            Abmelden
                        </Button>
                        <Button auto onClick={() => setVisible(false)}>
                            Schließen
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </nav>
    );
}

function SubNav({
                    item,
                    close
                }: {
    item: NavigationItem;
    close: () => false | void;
}) {
    const segment = useSelectedLayoutSegment();
    const isActive = item.slug === segment;

    return (
        <div className={`${styles.subitem} ${isActive ? "active" : ""}`}>
            <Link
                onClick={close}
                href={`/${item.slug}`}>
                {item.name}
            </Link>
        </div>
    );
}