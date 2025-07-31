import { FC } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

import { AppNavigationItem } from '../types/App.types'

type Props = AppNavigationItem & {
  to: string
  isOpen: boolean
}

export const AppNavigationButton: FC<Props> = (props) => {
  const { id, testId, text, icon, to, isOpen } = props

  return (
    <ListItemButton
      id={id}
      data-testid={testId}
      sx={{
        minHeight: 48,
        justifyContent: isOpen ? 'center' : 'initial',
        px: 2.5
      }}
      to={to}
      component={RouterLink}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 'auto' : 2,
          justifyContent: 'center'
        }}
      >
        {icon}
      </ListItemIcon>
      {!isOpen && <ListItemText primary={text} />}
    </ListItemButton>
  )
}
