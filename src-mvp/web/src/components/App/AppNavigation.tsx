import { AppBar, Button, Toolbar } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

export const AppNavigation = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={RouterLink} to="/">
          Home
        </Button>

        <Button color="inherit" component={RouterLink} to="/gallery">
          Gallery
        </Button>

        <Button color="inherit" component={RouterLink} to="/paths">
          Paths
        </Button>
      </Toolbar>
    </AppBar>
  )
}
