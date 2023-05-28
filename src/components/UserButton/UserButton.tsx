import type { UnstyledButtonProps } from '@mantine/core'
import { UnstyledButton, Group, Avatar, Text, createStyles } from '@mantine/core'
import { ChevronRight } from 'tabler-icons-react'
import type { Dispatch, SetStateAction, MouseEventHandler } from 'react'
import React from 'react'

const useStyles = createStyles((theme) => ({
  user: {
    display: 'block',
    width: '100%',
    padding: theme.spacing.md,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}))

interface UserButtonProps extends UnstyledButtonProps {
  image: string
  name: string
  email: string
  onClick: Dispatch<SetStateAction<boolean>>
  icon?: React.ReactNode
}

const UserButton = ({
  image,
  name,
  email,
  icon,
  onClick,
  ...others
}: UserButtonProps): JSX.Element => {
  const { classes } = useStyles()

  return (
    <UnstyledButton
      className={classes.user}
      {...others}
      onClick={onClick as unknown as MouseEventHandler<HTMLButtonElement>}
    >
      <Group>
        <Avatar src={image} radius="xl" />

        <div style={{ flex: 1 }}>
          <Text size="sm" weight={500}>
            {name}
          </Text>

          <Text color="dimmed" size="xs">
            {email}
          </Text>
        </div>

        {icon ?? <ChevronRight size={14} />}
      </Group>
    </UnstyledButton>
  )
}

export default UserButton
