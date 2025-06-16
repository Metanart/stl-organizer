import { FC } from 'react'
import { Modal } from '@renderer/domains/Common/components/Modal/Modal'

import { SourcesAddNew } from '../components/SourcesAddNew'
import { SourceNew } from '../state/types'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: (source: SourceNew) => void
}

export const SourcesAddNewContainer: FC<Props> = (props) => {
  const { isOpen, onSave, onClose } = props

  const handleSave = (source: SourceNew): void => {
    onSave(source)
    onClose()
  }

  return (
    <Modal title="Add new source folder" isOpen={isOpen} onClose={onClose}>
      <SourcesAddNew onSave={handleSave} />
    </Modal>
  )
}
