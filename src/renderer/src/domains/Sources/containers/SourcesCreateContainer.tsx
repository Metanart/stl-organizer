import { FC } from 'react'
import { Modal } from '@renderer/domains/Common/components/Modal/Modal'

import { SourcesCreate } from '../components/SourcesCreate'
import { useSourcesContext } from '../state/useSourcesContext'
import { SourceCreate } from '../types/Source.types'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export const SourcesCreateContainer: FC<Props> = (props) => {
  const { isOpen, onClose } = props

  const { create } = useSourcesContext()

  const handleSave = (source: SourceCreate): void => {
    create(source)
    onClose()
  }

  return (
    <Modal title="Add new source folder" isOpen={isOpen} onClose={onClose}>
      <SourcesCreate onSave={handleSave} />
    </Modal>
  )
}
