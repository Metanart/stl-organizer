import { FC } from 'react'
import { Modal } from '@renderer/domains/Common/components/Modal/Modal'

import { SourcesAddNew } from '../components/SourcesAddNew'
import { SourceItemNew } from '../state/types'

type Props = {
  isOpen: boolean
  onClose: () => void
  onSave: (item: SourceItemNew) => void
}

export const SourcesAddNewContainer: FC<Props> = (props) => {
  const { isOpen, onSave, onClose } = props

  const handleSave = (item: SourceItemNew): void => {
    onSave(item)
    onClose()
  }

  return (
    <Modal title="Add new source folder" isOpen={isOpen} onClose={onClose}>
      <SourcesAddNew onSave={handleSave} />
    </Modal>
  )
}
