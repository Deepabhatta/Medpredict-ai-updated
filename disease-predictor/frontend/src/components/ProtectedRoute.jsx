import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '120px 0', color: 'var(--text-l)' }}>
      <span style={{ animation: 'pulse 1.2s infinite' }}>Loading…</span>
    </div>
  )
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return children
}
