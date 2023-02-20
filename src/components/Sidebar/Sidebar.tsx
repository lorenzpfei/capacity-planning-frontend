import {Navbar, Group, Code, ScrollArea, createStyles, Modal, Button, Avatar} from '@mantine/core';
import { UserButton } from '../UserButton/UserButton';
import LinksGroup from '../NavbarLinksGroup/NavbarLinksGroup';
import React, {useState} from "react";
import {Logout} from 'tabler-icons-react';
import {useCookies} from "react-cookie";
import {navigation} from "../../lib/navigation";
import {User} from "../../lib/models";


const useStyles = createStyles((theme) => ({
    navbar: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
        paddingBottom: 0,
    },

    header: {
        padding: theme.spacing.md,
        paddingTop: 10,
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.white : theme.black
    },

    links: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md,
    },

    linksInner: {
        paddingTop: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },

    footer: {
        marginLeft: -theme.spacing.md,
        marginRight: -theme.spacing.md
    },

    besides: {
        display: 'flex',
        gap: "1rem",
        alignItems: 'center',
        marginBottom: '3rem'
    }
}));

const Sidebar = () => {
    const { classes } = useStyles();
    const links = navigation.map((item) => <LinksGroup {...item} key={item.label} />);
    const [jsonUser] = useCookies<string>(['user']);
    const user: User = jsonUser.user; //todo: prettier
    const [opened, setOpened] = useState(false);

    return (
        <>
            <Navbar.Section className={classes.header}>
                <Group position="apart">
                    Logo
                    <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
                </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <Modal
                    opened={opened}
                    onClose={() => setOpened(false)}
                    title="Logged in as"
                >
                    <div>
                        <div className={classes.besides}>
                            <Avatar src={user.avatar}></Avatar>
                            <div>
                                <strong>{user.name}</strong>
                                <div>{user.email}</div>
                            </div>
                        </div>
                        <Button component="a" href="#" variant="outline" leftIcon={<Logout size={14} />}>Logout</Button>
                    </div>
                </Modal>
                <UserButton
                    image={user.avatar}
                    name={user.name}
                    email={user.email}
                    onClick={setOpened}
                />
            </Navbar.Section>
        </>
    );
}

export default Sidebar;