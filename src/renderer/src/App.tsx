import { JSX, PropsWithChildren } from 'react'

export function App({ children }: PropsWithChildren): JSX.Element {
  return <div className="app-container">{children}</div>
}
