import type { ReactNode } from 'react'
import Brand from './Brand'

export default function AppHeader({ children }: { children?: ReactNode }) {
  return (
    <header className="app-header">
      <Brand />
      {children && <div className="header-right">{children}</div>}
    </header>
  )
}
