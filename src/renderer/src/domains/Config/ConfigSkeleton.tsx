import { FC } from 'react'
import { Skeleton, Stack } from '@mui/material'

export const ConfigSkeleton: FC = () => {
  return (
    <Stack spacing={3}>
      {/* Folder Inputs */}
      <Skeleton variant="rounded" height={56} />
      <Skeleton variant="rounded" height={56} />

      {/* Max Threads input */}
      <Skeleton variant="rounded" height={56} />

      {/* Checkboxes */}
      <Skeleton variant="text" width={240} height={42} />
      <Skeleton variant="text" width={280} height={42} />
      <Skeleton variant="text" width={200} height={42} />
      <Skeleton variant="text" width={160} height={42} />

      {/* Button */}
      <Skeleton variant="rectangular" width={140} height={38} />
    </Stack>
  )
}
