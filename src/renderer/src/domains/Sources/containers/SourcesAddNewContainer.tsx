import { FC } from 'react'
import { Modal } from '@renderer/domains/Common/components/Modal/Modal'

import { SourcesAddNew } from '../components/SourcesAddNew'
import { SourceCreate } from '../types/Source.types'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: (source: SourceCreate) => void
}

export const SourcesAddNewContainer: FC<Props> = (props) => {
  const { isOpen, onSave, onClose } = props

  const handleSave = (source: SourceCreate): void => {
    onSave(source)
    onClose()
  }

  return (
    <Modal title="Add new source folder" isOpen={isOpen} onClose={onClose}>
      <SourcesAddNew onSave={handleSave} />
    </Modal>
  )
}
