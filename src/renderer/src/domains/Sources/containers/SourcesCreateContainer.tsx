import { FC } from 'react'
import { Modal } from '@renderer/domains/Common/components/Modal/Modal'

import { SourceCreateFormDTO } from '@shared/domains/Sources/dtos/SourceDTO'

import { SourcesCreate } from '../components/SourcesCreate/SourcesCreate'

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
      <SourcesCreate onSave={handleSave} />
    </Modal>
  )
}
