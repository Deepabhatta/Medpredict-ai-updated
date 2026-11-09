import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth, friendlyError } from '../context/AuthContext'
import AuthCard, { GoogleButton, Divider, Alert, labelStyle, primaryBtn } from '../components/AuthCard'

export default function Login() {
  const { user, login, googleLogin, resetPassword, firebaseConfigured } = useAuth()
  const navigate = useNavigate()
  const from = useLocation().state?.from || '/'

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw]     = useState(false)
  const [error, setError]       = useState(null)
  const [info, setInfo]         = useState(null)
  const [loading, setLoading]   = useState(false)

  if (user) return <Navigate to={from} replace />

  const run = async (fn) => {
    setError(null); setInfo(null); setLoading(true)
    try { await fn(); navigate(from, { replace: true }) }
    catch (e) { setError(friendlyError(e)) }
    setLoading(false)
  }

  const submit = (e) => {
    e.preventDefault()
    if (!email || !password) return setError('Please enter your email and password.')
    run(() => login(email.trim(), password))
  }

  const forgot = async () => {
    if (!email) return setError('Enter your email above first, then click "Forgot password".')
    setError(null); setInfo(null)
    try { await resetPassword(email.trim()); setInfo('Password reset email sent. Check your inbox.') }
    catch (e) { setError(friendlyError(e)) }
  }

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Log in to access your predictions and reports"
      footer={<>Don't have an account? <Link to="/signup" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Sign up</Link></>}
    >
      {!firebaseConfigured && <Alert>Firebase keys are missing. Add them to <code>frontend/.env</code> (see README).</Alert>}
      {error && <Alert>⚠ {error}</Alert>}
      {info && <Alert type="info">✓ {info}</Alert>}

      <form onSubmit={submit}>
        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>EMAIL</label>
          <input type="email" autoComplete="email" placeholder="you@example.com"
                 value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label style={labelStyle}>PASSWORD</label>
          <div style={{ position: 'relative' }}>
            <input type={showPw ? 'text' : 'password'} autoComplete="current-password" placeholder="Your password"
                   value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 64 }} />
            <button type="button" onClick={() => setShowPw(s => !s)} style={{
              position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
              background: 'none', border: 'none', color: 'var(--primary)', fontSize: 12, fontWeight: 600,
            }}>{showPw ? 'Hide' : 'Show'}</button>
          </div>
        </div>
        <div style={{ textAlign: 'right', marginBottom: 20 }}>
          <button type="button" onClick={forgot} style={{
            background: 'none', border: 'none', color: 'var(--primary)', fontSize: 12, fontWeight: 600,
          }}>Forgot password?</button>
        </div>
        <button type="submit" disabled={loading} style={primaryBtn(loading)}>
          {loading ? '⟳ Logging in...' : 'Log In'}
        </button>
      </form>

      <Divider />
      <GoogleButton disabled={loading} onClick={() => run(googleLogin)} />
    </AuthCard>
  )
}
