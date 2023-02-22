import React, {useEffect} from 'react';
import './App.css';
import {ColorScheme, ColorSchemeProvider, MantineProvider} from "@mantine/core";
import {useLocalStorage} from "@mantine/hooks";
import {useCookies} from "react-cookie";
import {api} from "./lib/api";
import Layout from "./components/Layout/Layout";
import Login from "./pages/login/login";
import {Navigate, Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/dashboard/dashboard";
import Workload from "./pages/workload/workload";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });
  const [isLoggedIn, setLoggedIn, removeLogin] = useCookies(['user']);

  useEffect(() => {
    console.log('useEffect'); //todo: remove debug
    api.get('/user/me').then((res) => {
      setLoggedIn('user', res.data);
    }).catch(() => {
      console.log('remove'); //todo: remove debug
      removeLogin('user');
    })
  }, [setLoggedIn, removeLogin])



  const toggleColorScheme = (value?: ColorScheme) =>
      setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  return (
      <div>
        <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
          <MantineProvider theme={{colorScheme}} withGlobalStyles withNormalizeCSS>
            {(isLoggedIn.user) ?
                <Layout>
                  <Routes>
                    <Route path={''} element={<Dashboard/>}></Route>
                    <Route path={'/workload'} element={<Workload/>}></Route>
                    <Route path="*" element={<Navigate to={'/'} replace />} />
                  </Routes>
                </Layout> :
                <Routes>
                  <Route path={'/login'} element={<Login/>}></Route>
                  <Route path="*" element={<Navigate to={'/login'} replace />} />
                </Routes>}
          </MantineProvider>
        </ColorSchemeProvider>
      </div>
  );
}

export default App;
