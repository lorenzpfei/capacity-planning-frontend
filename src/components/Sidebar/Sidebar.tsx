import { Navbar, Group, Code, ScrollArea, createStyles, useMantineColorScheme } from '@mantine/core'
import LinksGroup from '../NavbarLinksGroup/NavbarLinksGroup'
import React from 'react'
import { navigation } from '../../lib/navigation'
import UserModal from '../UserModal/UserModal'

const useSidebarStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 10,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
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
    marginRight: -theme.spacing.md,
  },
  logo: {
    maxWidth: 'calc(100% - 120px)',
  },
}))

const Sidebar = (): React.JSX.Element => {
  const { classes } = useSidebarStyles()
  const links = navigation.map((item) => <LinksGroup {...item} key={item.label} />)
  const { colorScheme } = useMantineColorScheme()

  return (
    <>
      <Navbar.Section className={classes.header}>
        <Group position="apart">
          <img
            src={
              colorScheme === 'dark'
                ? process.env.REACT_APP_LOGO_URL_DARKMODE
                : process.env.REACT_APP_LOGO_URL_WHITEMODE
            }
            alt={process.env.REACT_APP_COMPANY_NAME}
            className={classes.logo}
          />
          <Code sx={{ fontWeight: 700 }}>v1.0.0</Code>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div className={classes.linksInner}>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserModal />
      </Navbar.Section>
    </>
  )
}

export default Sidebar
