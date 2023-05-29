import React, { useState } from 'react'
import { Collapse, UnstyledButton, createStyles } from '@mantine/core'
import type { NavigationItem } from '../../lib/navigation'
import { Link } from 'react-router-dom'
import CustomGroup from '../CustomGroup/CustomGroup'

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
}))

const LinksGroup = ({
  icon: Icon,
  label,
  link,
  initiallyOpened,
  childs,
}: NavigationItem): React.JSX.Element => {
  const { classes, theme } = useStyles()
  const hasLinks = Array.isArray(childs)
  const [opened, setOpened] = useState(initiallyOpened ?? false)
  const items = (hasLinks ? childs : []).map((child) => (
    <Link className={classes.link} to={child.link} key={child.label}>
      {child.label}
    </Link>
  ))

  return (
    <div>
      {hasLinks ? (
        <>
          <UnstyledButton onClick={() => setOpened((o) => !o)} className={classes.control}>
            <CustomGroup
              icon={Icon}
              label={label}
              hasLinks={hasLinks}
              classes={classes}
              opened={opened}
              theme={theme}
            />
          </UnstyledButton>
          <Collapse in={opened}>{items}</Collapse>
        </>
      ) : (
        <Link to={link ? link : '/'} className={classes.control}>
          <CustomGroup
            icon={Icon}
            label={label}
            hasLinks={hasLinks}
            classes={classes}
            opened={opened}
            theme={theme}
          />
        </Link>
      )}
    </div>
  )
}

export default LinksGroup
