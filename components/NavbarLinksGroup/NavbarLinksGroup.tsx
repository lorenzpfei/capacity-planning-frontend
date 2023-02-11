import {useState} from 'react';
import {Group, Box, Collapse, ThemeIcon, UnstyledButton, createStyles, ChevronIcon} from '@mantine/core';
import {IconChevronLeft, IconChevronRight} from '@tabler/icons';
import {NavigationItem} from "@/lib/navigation";
import Link from "next/link";

const useStyles = createStyles((theme) => ({
    control: {
        fontWeight: 500,
        display: 'block',
        width: '100%',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
        fontSize: theme.fontSizes.sm,
        textDecoration: 'none',

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    link: {
        fontWeight: 500,
        display: 'block',
        textDecoration: 'none',
        padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
        paddingLeft: 31,
        marginLeft: 30,
        fontSize: theme.fontSizes.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
        borderLeft: `1px solid ${
            theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]
        }`,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
            color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
    },

    chevron: {
        transition: 'transform 200ms ease',
    },
}));

const LinksGroup = ({icon: Icon, label, link, initiallyOpened, childs}: NavigationItem) => {
    const {classes, theme} = useStyles();
    const hasLinks = Array.isArray(childs);
    const [opened, setOpened] = useState(initiallyOpened || false);
    const ChevronIcon = theme.dir === 'ltr' ? IconChevronRight : IconChevronLeft;
    const items = (hasLinks ? childs : []).map((child) => (
        <Link
            className={classes.link}
            href={child.link}
            key={child.label}
        >
            {child.label}
        </Link>
    ));

    return (
        <>
            {hasLinks ?
                <>
                    <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
                        <CustomGroup icon={Icon} label={label} hasLinks={hasLinks} classes={classes} opened={opened}
                                     theme={theme} chefronIcon={ChevronIcon}/>
                    </UnstyledButton>
                    <Collapse in={opened}>{items}</Collapse>
                </> :
                <Link href={link ? link : '/'} className={classes.control}>
                    <CustomGroup icon={Icon} label={label} hasLinks={hasLinks} classes={classes} opened={opened}
                                 theme={theme} chefronIcon={ChevronIcon}/>
                </Link>
            }
        </>
    );
}

export default LinksGroup;


const CustomGroup = ({icon: Icon, label, hasLinks, classes, opened, theme, chefronIcon: ChevronIcon}: any) => {
    return (
        <Group position="apart" spacing={0}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
                <ThemeIcon variant="light" size={30}>
                    <Icon size={18}/>
                </ThemeIcon>
                <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
                <ChevronIcon
                    className={classes.chevron}
                    size={14}
                    stroke={1.5}
                    style={{
                        transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
                    }}
                />
            )}
        </Group>
    )
}