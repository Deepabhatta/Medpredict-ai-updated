import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signInWithPopup, signOut, updateProfile, sendPasswordResetEmail,
} from 'firebase/auth'
import { auth, googleProvider, firebaseConfigured } from '../firebase'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

const ERRORS = {
  'auth/email-already-in-use':   'An account with this email already exists. Try logging in.',
  'auth/invalid-email':          'Please enter a valid email address.',
  'auth/weak-password':          'Password must be at least 6 characters.',
  'auth/user-not-found':         'No account found with this email.',
  'auth/wrong-password':         'Incorrect password. Please try again.',
  'auth/invalid-credential':     'Incorrect email or password.',
  'auth/too-many-requests':      'Too many attempts. Please wait a moment and try again.',
  'auth/popup-closed-by-user':   'Google sign-in was cancelled.',
  'auth/network-request-failed': 'Network error. Check your connection and try again.',
  'auth/operation-not-allowed':  'This sign-in method is not enabled in Firebase yet.',
}
export const friendlyError = (e) => ERRORS[e?.code] || e?.message || 'Something went wrong. Please try again.'

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!auth) { setLoading(false); return }
    return onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false) })
  }, [])

  const guard = () => {
    if (!auth) throw new Error('Firebase is not configured. Add your VITE_FIREBASE_* keys to frontend/.env and restart.')
  }

  const signup = async (name, email, password) => {
    guard()
    const cred = await createUserWithEmailAndPassword(auth, email, password)
    if (name) await updateProfile(cred.user, { displayName: name })
    setUser({ ...cred.user, displayName: name })
    return cred.user
  }
  const login       = async (email, password) => { guard(); return signInWithEmailAndPassword(auth, email, password) }
  const googleLogin = async () => { guard(); return signInWithPopup(auth, googleProvider) }
  const logout      = async () => { guard(); return signOut(auth) }
  const resetPassword = async (email) => { guard(); return sendPasswordResetEmail(auth, email) }

  return (
    <AuthContext.Provider value={{ user, loading, firebaseConfigured, signup, login, googleLogin, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  )
}
