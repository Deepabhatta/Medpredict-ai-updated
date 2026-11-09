import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth, friendlyError } from '../context/AuthContext'
import AuthCard, { GoogleButton, Divider, Alert, labelStyle, primaryBtn } from '../components/AuthCard'

export default function Signup() {
  const { user, signup, googleLogin, firebaseConfigured } = useAuth()
  const navigate = useNavigate()

  const [form, setForm]       = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw]   = useState(false)
  const [error, setError]     = useState(null)
  const [loading, setLoading] = useState(false)

  if (user) return <Navigate to="/" replace />

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const run = async (fn) => {
    setError(null); setLoading(true)
    try { await fn(); navigate('/', { replace: true }) }
    catch (e) { setError(friendlyError(e)) }
    setLoading(false)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!form.name.trim())              return setError('Please enter your name.')
    if (!form.email)                    return setError('Please enter your email.')
    if (form.password.length < 6)       return setError('Password must be at least 6 characters.')
    if (form.password !== form.confirm) return setError('Passwords do not match.')
    run(() => signup(form.name.trim(), form.email.trim(), form.password))
  }

  return (
    <AuthCard
      title="Create your account"
      subtitle="Sign up to run predictions and download reports"
      footer={<>Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Log in</Link></>}
    >
      {!firebaseConfigured && <Alert>Firebase keys are missing. Add them to <code>frontend/.env</code> (see README).</Alert>}
      {error && <Alert>⚠ {error}</Alert>}

      <form onSubmit={submit}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>FULL NAME</label>
          <input type="text" autoComplete="name" placeholder="Your name" value={form.name} onChange={set('name')} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>EMAIL</label>
          <input type="email" autoComplete="email" placeholder="you@example.com" value={form.email} onChange={set('email')} />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>PASSWORD</label>
          <div style={{ position: 'relative' }}>
            <input type={showPw ? 'text' : 'password'} autoComplete="new-password" placeholder="At least 6 characters"
                   value={form.password} onChange={set('password')} style={{ paddingRight: 64 }} />
            <button type="button" onClick={() => setShowPw(s => !s)} style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: 'var(--primary)', fontSize: 12, fontWeight: 600,
            }}>{showPw ? 'Hide' : 'Show'}</button>
          </div>
        </div>
        <div style={{ marginBottom: 22 }}>
          <label style={labelStyle}>CONFIRM PASSWORD</label>
          <input type={showPw ? 'text' : 'password'} autoComplete="new-password" placeholder="Repeat password"
                 value={form.confirm} onChange={set('confirm')} />
        </div>
        <button type="submit" disabled={loading} style={primaryBtn(loading)}>
          {loading ? '⟳ Creating account...' : 'Sign Up'}
        </button>
      </form>

      <Divider />
      <GoogleButton disabled={loading} onClick={() => run(googleLogin)} />
    </AuthCard>
  )
}
