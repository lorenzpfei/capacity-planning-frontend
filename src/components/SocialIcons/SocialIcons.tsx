import type { ButtonProps } from '@mantine/core'
import { Button, Group } from '@mantine/core'
import { MicrosoftButton as MicrosoftIcon } from './MicrosoftButton'
import React from 'react'

export function MicrosoftButton(props: ButtonProps): JSX.Element {
  return <Button leftIcon={<MicrosoftIcon />} {...props} />
}

export function SocialButtons(): JSX.Element {
  return (
    <Group position="center" sx={{ padding: 15 }}>
      <MicrosoftButton>Sign in with Microsoft</MicrosoftButton>
    </Group>
  )
}
