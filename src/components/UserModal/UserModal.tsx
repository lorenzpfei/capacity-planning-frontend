import React, { useEffect, useState } from 'react'
import { Avatar, Button, createStyles, Modal } from '@mantine/core'
import { Check, Link, Logout } from 'tabler-icons-react'
import { useCookies } from 'react-cookie'
import { api } from '../../lib/api'
import { useNavigate } from 'react-router-dom'
import UserButton from '../UserButton/UserButton'
import type { UserFromSession } from '../../lib/models'

interface OAuth {
  name: string
  connected: boolean
}

const useModalStyles = createStyles(() => ({
  besides: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  connected: {
    marginTop: 15,
    marginBottom: 15,
  },
}))

const UserModal = (): React.JSX.Element => {
  const { classes } = useModalStyles()
  const [opened, setOpened] = useState(false)
  const [cookies, , removeCookie] = useCookies<string>(['user'])
  const [userFromSession, setUserFromSession] = useState<UserFromSession | null>(null)

  useEffect(() => {
    const { user } = cookies
    if (user) {
      try {
        if (user && typeof user === 'object' && 'email' in user) {
          setUserFromSession(user as UserFromSession)
        }
      } catch (err: unknown) {
        console.error('Error parsing user:', err)
      }
    }
  }, [cookies])

  const [oauth, setOAuth] = useState<OAuth[]>([])

  useEffect(() => {
    if (oauth.length === 0) {
      void api.get('/user/oauth').then((res: { data: OAuth[] }) => {
        setOAuth(res.data)
      })
    }
  }, [oauth.length])

  const ucFirst = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1)

  const navigate = useNavigate()
  const handleLogout = async (): Promise<void> => {
    await api.get('/user/logout')
    removeCookie('user')
    removeCookie('XSRF-TOKEN')
    navigate('/login')
  }

  if (userFromSession === null) {
    return <div>Error parsing user data.</div>
  }

  return (
    <>
      <Modal opened={opened} onClose={() => setOpened(false)} title="Logged in as">
        <div>
          <div className={classes.besides}>
            <Avatar src={userFromSession.avatar} />
            <div>
              <strong>{userFromSession.name}</strong>
              <div>{userFromSession.email}</div>
            </div>
          </div>
          <div className={classes.connected}>
            {oauth.length > 0
              ? oauth.map((item) => (
                  <div key={item.name}>
                    {item.connected ? (
                      <Button
                        compact
                        variant="gradient"
                        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                        leftIcon={<Check size={14} />}
                      >
                        {ucFirst(item.name)}
                      </Button>
                    ) : (
                      <a href={`${process.env.REACT_APP_PUBLIC_API_URL}/oauth/${item.name}`}>
                        <Button
                          compact
                          variant="gradient"
                          gradient={{ from: 'indigo', to: 'cyan' }}
                          leftIcon={<Link size={14} />}
                        >
                          Connect to {ucFirst(item.name)}
                        </Button>
                      </a>
                    )}
                  </div>
                ))
              : undefined}
          </div>
          <Button
            component="a"
            href="#"
            variant="outline"
            leftIcon={<Logout size={14} />}
            onClick={() => handleLogout}
          >
            Logout
          </Button>
        </div>
      </Modal>
      <UserButton
        image={userFromSession.avatar}
        name={userFromSession.name}
        email={userFromSession.email}
        onClick={setOpened}
      />
    </>
  )
}

export default UserModal
