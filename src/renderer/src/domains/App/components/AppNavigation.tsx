import { Children, FC, ReactElement } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { Drawer, IconButton, List, ListItem, Toolbar } from '@mui/material'

import { AppNavigationItem } from '../types'

const drawerWidthExpanded = 200
const drawerWidthCollapsed = 64

type Props = {
  children: ReactElement<AppNavigationItem>[]
  onToggleClick: () => void
  isOpen: boolean
}

export const AppNavigation: FC<Props> = (props) => {
  const { children, onToggleClick, isOpen } = props

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isOpen ? drawerWidthCollapsed : drawerWidthExpanded,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: isOpen ? drawerWidthCollapsed : drawerWidthExpanded,
          transition: 'width 0.3s',
          overflowX: 'hidden'
        }
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          px: 1.5,
          minHeight: 64
        }}
      >
        <IconButton onClick={onToggleClick}>
          <MenuIcon />
        </IconButton>
      </Toolbar>

      <List>
        {Children.map(children, (child) => {
          return (
            <ListItem disablePadding sx={{ display: 'block' }}>
              {child}
            </ListItem>
          )
        })}
      </List>
    </Drawer>
  )
}
