import { FC, PropsWithChildren } from 'react'

import { SourcesCreateForm } from '../components/SourcesCreateForm/SourcesCreateForm'

export const SourcesCreateFormContainer: FC<PropsWithChildren> = (props) => {
  const handleSave = (): null => null

  return <SourcesCreateForm onSave={handleSave} />
}
