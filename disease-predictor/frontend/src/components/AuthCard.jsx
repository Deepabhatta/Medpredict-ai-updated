// Shared layout + styles for the Login and Signup pages
export const labelStyle = {
  display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-m)',
  marginBottom: 6, letterSpacing: 0.5,
}

export const primaryBtn = (disabled) => ({
  width: '100%', padding: 13, border: 'none', borderRadius: 10, color: 'white',
  background: disabled ? '#a0aec0' : 'var(--primary)', fontSize: 15, fontWeight: 700,
  cursor: disabled ? 'not-allowed' : 'pointer', transition: 'all 0.15s',
})

export function GoogleButton({ onClick, disabled }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} style={{
      width: '100%', padding: 12, borderRadius: 10, border: '1.5px solid var(--border)',
      background: 'var(--white)', color: 'var(--text)', fontSize: 14, fontWeight: 600,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
    }}>
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.9 2.4 30.4 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"/>
        <path fill="#FBBC05" d="M10.5 28.7A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.7l-7.9-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.1z"/>
        <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.9 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/>
      </svg>
      Continue with Google
    </button>
  )
}

export default function AuthCard({ title, subtitle, children, footer }) {
  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '32px 16px',
    }}>
      <div className="fade-in" style={{
        width: '100%', maxWidth: 420, background: 'var(--white)', borderRadius: 16,
        padding: '36px 32px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 52, height: 52, margin: '0 auto 14px', borderRadius: 14, fontSize: 26,
            background: 'linear-gradient(135deg, #0ea47a, #0b8562)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>🏥</div>
          <h1 style={{ fontFamily: 'Poppins', fontSize: 24, fontWeight: 700 }}>{title}</h1>
          <p style={{ color: 'var(--text-l)', fontSize: 13, marginTop: 6 }}>{subtitle}</p>
        </div>
        {children}
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-m)', marginTop: 22 }}>{footer}</div>
      </div>
    </div>
  )
}

export const Divider = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '20px 0', color: 'var(--text-l)', fontSize: 12 }}>
    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} /> OR
    <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
  </div>
)

export const Alert = ({ type = 'error', children }) => (
  <div style={{
    background: type === 'error' ? 'var(--danger-l)' : 'var(--primary-l)',
    border: `1px solid ${type === 'error' ? '#fed7d7' : '#b7e8d8'}`,
    color: type === 'error' ? 'var(--danger)' : 'var(--primary-d)',
    padding: '11px 14px', borderRadius: 8, fontSize: 13, marginBottom: 16,
  }}>{children}</div>
)
