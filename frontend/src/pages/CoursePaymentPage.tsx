import { useState } from 'react'
import { useAuth } from '@clerk/react'
import { ArrowRight, CreditCard } from '../components/Icons'
import type { CourseCardData } from '../components/CourseCard'

async function readResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    const detail = response.status === 404 ? 'The payment API route was not found. Restart the backend and try again.' : `The server returned an unexpected page (HTTP ${response.status}).`
    throw new Error(detail)
  }
  const data = await response.json() as T & { message?: string }
  if (!response.ok) throw new Error(data.message ?? `Request failed (HTTP ${response.status}).`)
  return data
}

export default function CoursePaymentPage({ course, onBack }: { course: CourseCardData; onBack: () => void }) {
  const { getToken } = useAuth()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function checkout() {
    setBusy(true)
    setError('')
    try {
      const token = await getToken()
      if (!token) throw new Error('Sign in again to continue to checkout.')
      const response = await fetch('/api/payments/initialize', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify({ courseId: course.id }) })
      const data = await readResponse<{ authorizationUrl?: string; alreadyEnrolled?: boolean }>(response)
      if (data.alreadyEnrolled) { onBack(); return }
      if (!data.authorizationUrl) throw new Error('Checkout did not return a payment link.')
      window.location.assign(data.authorizationUrl)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not start checkout. Please try again.')
    } finally { setBusy(false) }
  }

  return <section className="billing-page course-payment-page">
    <button className="course-back-button" onClick={onBack}>← All courses</button>
    <div className="page-intro"><span className="panel-kicker">COURSE ACCESS</span><h1>Continue to {course.title}</h1><p>Purchase this course once to unlock all three levels, lessons, the checkpoint and your completion certificate.</p></div>
    <article className="course-payment-card">
      <div className={`course-art ${course.accent} ${course.image ? 'has-cover' : ''}`}>{course.image && <img className="course-cover-image" src={course.image} alt={course.imageAlt ?? ''} />}</div>
      <div className="course-payment-copy"><span className="panel-kicker">ONE-TIME COURSE PAYMENT</span><h2>{course.title}</h2><p>{course.description}</p><div className="course-payment-price">{course.priceNgn ? `₦${course.priceNgn.toLocaleString('en-NG')}` : 'Price pending setup'}</div><p className="course-payment-methods"><CreditCard size={17} /> Secure card checkout · Visa · Mastercard · Verve</p>
        {error && <p className="lesson-save-error" role="alert">{error}</p>}
        {course.priceNgn ? <button className="primary-button" onClick={() => void checkout()} disabled={busy}>{busy ? 'Connecting to secure checkout…' : <>Pay by card <ArrowRight size={16} /></>}</button> : <p className="billing-setup-note">Checkout opens when the course price and Paystack merchant keys are configured.</p>}
      </div>
    </article>
  </section>
}
