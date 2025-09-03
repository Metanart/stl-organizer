import { app } from 'electron'

import path from 'path'

export const AppPaths = {
  defaultOutputFolder: path.join(app.getPath('documents'), 'STLOrganizer', 'output'),
  defaultTempFolder: path.join(app.getPath('documents'), 'STLOrganizer', 'temp'),
  defaultCacheFolder: path.join(app.getPath('documents'), 'STLOrganizer', 'cache'),
  defaultConfigFolder: path.join(app.getPath('documents'), 'STLOrganizer', 'config'),
  defaultDBFile: path.join(app.getPath('documents'), 'STLOrganizer', 'stl-organizer.sqlite')
}
