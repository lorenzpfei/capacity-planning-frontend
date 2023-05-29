import React, { useEffect } from 'react'
import './App.css'
import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import type { ColorScheme } from '@mantine/core'
import { useLocalStorage } from '@mantine/hooks'
import { useCookies } from 'react-cookie'
import { api } from './lib/api'
import Layout from './components/Layout/Layout'
import Login from './pages/login/login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard/dashboard'
import Workload from './pages/workload/workload'
import { IntlProvider } from 'react-intl'

function App(): React.JSX.Element {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  })
  const [isLoggedIn, setLoggedIn, removeLogin] = useCookies(['user'])

  useEffect(() => {
    api
      .get('/user/me')
      .then((res) => {
        setLoggedIn('user', res.data)
      })
      .catch(() => {
        removeLogin('user')
      })
  }, [setLoggedIn, removeLogin])

  const toggleColorScheme = (value?: ColorScheme): void =>
    setColorScheme(value ?? (colorScheme === 'dark' ? 'light' : 'dark'))

  return (
    <div>
      <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
          <IntlProvider locale={navigator.language} defaultLocale="en">
            {isLoggedIn.user ? (
              <Layout>
                <Routes>
                  <Route path={''} element={<Dashboard />} />
                  <Route path={'/capacities'} element={<Workload />} />
                  <Route path="*" element={<Navigate to={'/'} replace />} />
                </Routes>
              </Layout>
            ) : (
              <Routes>
                <Route path={'/'} element={<Login />} />
                <Route path="*" element={<Navigate to={'/login'} replace />} />
              </Routes>
            )}
          </IntlProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </div>
  )
}

export default App
