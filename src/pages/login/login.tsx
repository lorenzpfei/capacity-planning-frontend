import { useToggle, upperFirst } from '@mantine/hooks'
import { useForm } from '@mantine/form'
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Divider,
  Checkbox,
  Stack,
  Switch,
  useMantineTheme,
  useMantineColorScheme,
} from '@mantine/core'
import { MoonStars, Sun } from 'tabler-icons-react'
import React from 'react'
import { MicrosoftButton } from '../../components/SocialIcons/SocialIcons'
import { Link } from 'react-router-dom'

const Login = (): React.JSX.Element => {
  const [type] = useToggle(['login', 'register'])
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  })
  const theme = useMantineTheme()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div style={{ position: 'absolute', top: 15, right: 15 }}>
        <Switch
          checked={colorScheme === 'dark'}
          onChange={() => toggleColorScheme()}
          size="lg"
          onLabel={<Sun color={theme.white} size={20} />}
          offLabel={<MoonStars color={theme.colors.gray[6]} size={20} />}
        />
      </div>
      <div
        style={{
          justifyContent: 'center', //Centered horizontally
          alignItems: 'center', //Centered vertically
          display: 'flex',
          height: '100%',
        }}
      >
        <Paper radius="md" p="xl" withBorder style={{ width: 400, maxWidth: '100%' }}>
          <Text size="lg" weight={500}>
            Login
          </Text>

          <Group grow mb="md" mt="md">
            <Link
              to={`${process.env.REACT_APP_PUBLIC_API_URL}/oauth/azure/`}
              style={{ display: 'block' }}
            >
              <MicrosoftButton radius="xl" style={{ width: '100%' }}>
                Microsoft
              </MicrosoftButton>
            </Link>
          </Group>

          <Divider label="Or continue with email" labelPosition="center" my="lg" />

          <form
            onSubmit={form.onSubmit((values) => {
              console.log(values.password, values.terms, values.name, values.email) //todo: normal login
            })}
          >
            <Stack>
              {type === 'register' && (
                <TextInput
                  label="Name"
                  placeholder="Your name"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
                />
              )}

              <TextInput
                required
                label="Email"
                placeholder="contact@mail.dev"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'}
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                error={form.errors.password && 'Password should include at least 6 characters'}
              />

              {type === 'register' && (
                <Checkbox
                  label="I accept terms and conditions"
                  checked={form.values.terms}
                  onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                />
              )}
            </Stack>

            <Group position="apart" mt="xl">
              <Button type="submit">{upperFirst(type)}</Button>
            </Group>
          </form>
        </Paper>
      </div>
    </div>
  )
}

export default Login
