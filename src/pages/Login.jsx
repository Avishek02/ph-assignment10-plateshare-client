import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'

function Login() {
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const onSubmit = async data => {
    try {
      setError('')
      await signInWithEmailAndPassword(auth, data.email, data.password)
      navigate(from, { replace: true })
    } catch {
      setError('Login failed')
    }
  }

  const handleGoogle = async () => {
    try {
      setError('')
      await signInWithPopup(auth, googleProvider)
      navigate(from, { replace: true })
    } catch {
      setError('Google login failed')
    }
  }

  return (
    <div className="px-4 py-6 flex justify-center">
      <div className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Login</h2>

        {error && (
          <p className="mt-2 rounded border border-[var(--danger)] bg-[rgba(239,68,68,0.1)] px-3 py-2 text-sm text-[var(--danger)]">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">
          <input
            className="rounded border border-[var(--border)] px-3 py-2 text-[var(--text)] placeholder:text-[var(--text-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
            placeholder="Email"
            type="email"
            {...register('email', { required: true })}
          />

          <div className="flex items-center gap-3 rounded border border-[var(--border)] px-3 py-2 focus-within:ring-2 focus-within:ring-[var(--accent-soft)]">
            <input
              className="w-full outline-none text-[var(--text)] placeholder:text-[var(--text-soft)]"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              {...register('password', { required: true })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="text-sm font-medium text-[var(--accent)] hover:text-[var(--accent-strong)]"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="rounded bg-[var(--accent)] px-4 py-2 font-medium text-white hover:bg-[var(--accent-strong)]"
          >
            Login
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="mt-3 w-full rounded border border-[var(--border)] bg-[var(--bg)] px-4 py-2 font-medium text-[var(--text)] hover:bg-[var(--bg-soft)]"
        >
          Login with Google
        </button>

        <p className="mt-4 text-sm text-[var(--text-soft)]">
          New here?{' '}
          <Link className="text-[var(--accent)] hover:underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
