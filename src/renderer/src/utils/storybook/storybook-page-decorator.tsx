import { FC, PropsWithChildren } from 'react'

export const StorybookPageDecorator: FC<PropsWithChildren> = (props) => {
  return <div style={{ maxWidth: 600, margin: '0 auto', padding: 24 }}>{props.children}</div>
}
