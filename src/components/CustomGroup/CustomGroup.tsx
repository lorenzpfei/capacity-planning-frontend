import type { MantineTheme } from '@mantine/core'
import { Box, Group, ThemeIcon } from '@mantine/core'
import type { Icon } from 'tabler-icons-react'
import { ChevronLeft } from 'tabler-icons-react'
import React from 'react'

interface ICustomGroups {
  icon: Icon
  label: string
  hasLinks: boolean
  classes: { control: string; link: string; chevron: string }
  opened: boolean
  theme: MantineTheme
}

const CustomGroup = ({
  icon: Icon,
  label,
  hasLinks,
  classes,
  opened,
  theme,
}: ICustomGroups): React.JSX.Element => {
  const ChevronIcon = theme.dir === 'ltr' ? ChevronLeft : ChevronLeft
  return (
    <Group position="apart" spacing={0}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ThemeIcon variant="light" size={30}>
          <Icon size={18} />
        </ThemeIcon>
        <Box ml="md">{label}</Box>
      </Box>
      {hasLinks && (
        <ChevronIcon
          className={classes.chevron}
          size={14}
          stroke={'1.5'}
          style={{
            transform: opened ? `rotate(${theme.dir === 'rtl' ? -90 : 90}deg)` : 'none',
          }}
        />
      )}
    </Group>
  )
}

export default CustomGroup
