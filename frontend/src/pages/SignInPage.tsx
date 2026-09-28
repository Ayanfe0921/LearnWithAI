import { SignIn } from '@clerk/react'
import { Check, Sparkles } from '../components/Icons'
import AppHeader from '../components/AppHeader'

export default function SignInPage() {
  return (
    <main className="signin-page">
      <AppHeader />
      <section className="signin-content">
        <div className="signin-intro">
          <div className="eyebrow"><Sparkles size={14} /> YOUR PERSONAL LEARNING SPACE</div>
          <h1>Make learning<br /><span>feel effortless.</span></h1>
          <p>Turn what you want to learn into a clear, guided path. Your AI study partner is ready when you are.</p>
          <div className="signin-benefits">
            <span><Check size={15} /> Learn at your own pace</span>
            <span><Check size={15} /> Pick up where you left off</span>
          </div>
        </div>
        <div className="sign-in-card">
          <div className="card-heading">Welcome to your next chapter</div>
          <p className="card-copy">Sign in or create an account to get started.</p>
          <SignIn routing="hash" />
        </div>
      </section>
      <footer className="app-footer">Small steps. Big ideas. Your pace.</footer>
    </main>
  )
}
