import { Show } from '@clerk/react'
import AuthenticatedApp from './layouts/AuthenticatedApp'
import SignInPage from './pages/SignInPage'

export default function App() {
  return (
    <>
      <Show when="signed-out"><SignInPage /></Show>
      <Show when="signed-in"><AuthenticatedApp /></Show>
    </>
  )
}
