import { FC } from 'react'
import { Modal } from '@renderer/domains/Common/components/Modal/Modal'

import { SourceCreateFormDTO } from '@shared/domains/Sources/dto/SourceDTO'

import { SourcesCreate } from '../components/SourcesCreate'
import { useSourcesContext } from '../state/useSourcesContext'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const SourcesCreateContainer: FC<Props> = (props) => {
  const { isOpen, onClose } = props

  const { create } = useSourcesContext()

  const handleSave = (source: SourceCreateFormDTO): void => {
    create(source)
    onClose()
  }

  return (
    <Modal title="Add new source folder" isOpen={isOpen} onClose={onClose}>
      <SourcesCreate onSave={handleSave} />
    </Modal>
  )
}
