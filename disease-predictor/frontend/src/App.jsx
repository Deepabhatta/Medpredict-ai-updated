import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Diabetes from './pages/Diabetes'
import Heart from './pages/Heart'
import Cancer from './pages/Cancer'
import Results from './pages/Results'
import Dashboard from './pages/Dashboard'

const guard = (el) => <ProtectedRoute>{el}</ProtectedRoute>

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/"        element={<Home />} />
        <Route path="/login"   element={<Login />} />
        <Route path="/signup"  element={<Signup />} />

        {/* Login required */}
        <Route path="/diabetes"  element={guard(<Diabetes />)} />
        <Route path="/heart"     element={guard(<Heart />)} />
        <Route path="/cancer"    element={guard(<Cancer />)} />
        <Route path="/results"   element={guard(<Results />)} />
        <Route path="/dashboard" element={guard(<Dashboard />)} />
      </Routes>
    </div>
  )
}
