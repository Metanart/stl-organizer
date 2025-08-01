import { FC } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

type Props = {
  title: string
  createdAt: string
  thumbnailUrl: string
  comment?: string
  onDelete: () => void
  onAddFavorite: () => void
}

export const ModelsCard: FC<Props> = (props) => {
  const { title, createdAt, thumbnailUrl, comment, onDelete, onAddFavorite } = props

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={title} subheader={createdAt} />
      <CardMedia component="img" height="160" image={thumbnailUrl} />
      <CardContent>
        {comment ? (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {comment}
          </Typography>
        ) : null}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={onAddFavorite}>
          <FavoriteIcon />
        </IconButton>
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  )
}
