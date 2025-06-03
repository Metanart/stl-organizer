import { Request, RequestHandler, Response } from 'express'

import { DBSource } from '../db/db-source'
import { ConfigEntity } from '../db/entities/ConfigEntity'

export const saveConfigHandler: RequestHandler = async (req: Request, res: Response) => {
  const config = req.body as Record<string, string | number>

  try {
    const repo = DBSource.getRepository(ConfigEntity)

    for (const [key, rawValue] of Object.entries(config)) {
      const value = String(rawValue)
      const existing = await repo.findOneBy({ key })

      if (existing) {
        existing.value = value
        await repo.save(existing)
      } else {
        const entry = repo.create({ key, value })
        await repo.save(entry)
      }
    }

    res.json({ ok: true })
    return
  } catch (error) {
    console.error('Failed to save config:', error)
    res.status(500).json({ message: 'Failed to save config' })
    return
  }
}

export const getConfigHandler: RequestHandler = async (_req: Request, res: Response) => {
  try {
    const repo = DBSource.getRepository(ConfigEntity)
    const rows = await repo.find()

    const config: Record<string, string> = {}
    for (const { key, value } of rows) {
      config[key] = value
    }

    res.json(config)
    return
  } catch (error) {
    console.error('Failed to fetch config:', error)
    res.status(500).json({ message: 'Failed to fetch config' })
    return
  }
}
