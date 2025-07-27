import { FC } from 'react'
import { Modal } from '@renderer/domains/Common/components/Modal/Modal'

import { SourceCreateFormDTO } from '@shared/domains/Sources/Sources.dtos'

import { SourcesCreateForm } from '../components/SourcesCreateForm/SourcesCreateForm'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const SourcesCreateContainer: FC<Props> = (props) => {
  const { isOpen, onClose } = props

  const handleSave = (source: SourceCreateFormDTO): void => {
    onClose()
  }

  return (
    <Modal title="Add new source folder" isOpen={isOpen} onClose={onClose}>
      <SourcesCreateForm onSave={handleSave} />
    </Modal>
  )
}
