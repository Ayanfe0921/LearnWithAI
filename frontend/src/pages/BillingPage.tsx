import { CreditCard, Sparkles } from '../components/Icons'

export default function BillingPage() {
  return (
    <section className="billing-page">
      <div className="page-intro"><span className="panel-kicker">COURSE PAYMENTS</span><h1>Pay per course</h1><p>Each course has a one-time card payment. Open a course from the Courses page to see its price and unlock access.</p></div>
      <div className="billing-current"><CreditCard size={18} /><span>Visa, Mastercard and other enabled card methods are processed securely through Paystack.</span></div>
      <article className="billing-plan billing-plan-featured"><span className="billing-plan-badge"><Sparkles size={13} /> COURSE ACCESS</span><span className="panel-kicker">NO RECURRING PLANS</span><h2>Choose a course to continue</h2><p>Payment unlocks that course’s complete learning path, checkpoint and certificate eligibility.</p><p className="billing-setup-note">Prices and the merchant payment account must be configured before card checkout can go live.</p></article>
    </section>
  )
}
