import { Navbar, Group, Code, ScrollArea, createStyles } from '@mantine/core';
import { UserButton } from '../UserButton/UserButton';
import LinksGroup from '../NavbarLinksGroup/NavbarLinksGroup';
import {navigation} from "@/lib/navigation";


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
}));

const Sidebar = () => {
    const { classes } = useStyles();
    const links = navigation.map((item) => <LinksGroup {...item} key={item.label} />);

    return (
        <>
            <Navbar.Section className={classes.header}>
                <Group position="apart">
                    Logo
                    <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
                </Group>
            </Navbar.Section>

            <Navbar.Section grow className={classes.links} component={ScrollArea}>
                <div className={classes.linksInner}>{links}</div>
            </Navbar.Section>

            <Navbar.Section className={classes.footer}>
                <UserButton
                    image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
                    name="Ann Nullpointer"
                    email="anullpointer@yahoo.com"
                />
            </Navbar.Section>
        </>
    );
}

export default Sidebar;