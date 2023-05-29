import React, { useState } from 'react'
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
  useMantineColorScheme,
  Switch,
} from '@mantine/core'
import { MoonStars, Sun } from 'tabler-icons-react'
import Sidebar from '../Sidebar/Sidebar'

export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <AppShell
      layout={'alt'}
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          display: 'grid',
          minHeight: '100vh',
        },
      }}
      padding={1}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 300 }}
          withBorder={false}
        >
          <Sidebar />
        </Navbar>
      }
      header={
        <Header height={{ base: 70 }} p="md" withBorder={false}>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
              }}
            >
              <Text>Application header</Text>
              <Switch
                checked={colorScheme === 'dark'}
                onChange={() => toggleColorScheme()}
                size="lg"
                onLabel={<Sun color={theme.white} size={20} />}
                offLabel={<MoonStars color={theme.colors.gray[6]} size={20} />}
              />
            </div>
          </div>
        </Header>
      }
    >
      <div
        style={{
          boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
          padding: 16,
        }}
      >
        {children}
      </div>
    </AppShell>
  )
}
