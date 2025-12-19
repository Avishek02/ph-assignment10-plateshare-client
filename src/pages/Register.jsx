import { useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword, updateProfile, signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../lib/firebase'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { success, error as toastError } from '../lib/feedback'
import api from '../lib/api'

function Register() {
  const { register, handleSubmit } = useForm()
  const [formError, setFormError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const uploadImage = async file => {
    const formData = new FormData()
    formData.append('image', file)

    const res = await api.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
      formData
    )
    return res.data.data.url
  }

  const onSubmit = async data => {
    try {
      setFormError('')
      const password = data.password || ''

      if (!/[A-Z]/.test(password)) {
        setFormError('Password must have an Uppercase letter.')
        return
      }
      if (!/[a-z]/.test(password)) {
        setFormError('Password must have a Lowercase letter.')
        return
      }
      if (password.length < 6) {
        setFormError('Password length must be at least 6 characters.')
        return
      }

      let photoURL = ''
      if (data.photo?.[0]) {
        photoURL = await uploadImage(data.photo[0])
      }

      const cred = await createUserWithEmailAndPassword(auth, data.email, password)

      await updateProfile(cred.user, {
        displayName: data.name,
        photoURL
      })

      success('Registration successful.')
      navigate('/')
    } catch {
      setFormError('Register failed.')
      toastError('Register failed.')
    }
  }

  const handleGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
      success('Login successful.')
      navigate('/')
    } catch {
      toastError('Google login failed.')
    }
  }

  return (
    <div className="px-4 py-6 flex justify-center">
      <div className="w-full max-w-md rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-[var(--text)]">Register</h2>

        {formError && (
          <p className="mt-2 rounded border border-[var(--danger)] bg-[rgba(239,68,68,0.1)] px-3 py-2 text-sm text-[var(--danger)]">
            {formError}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-3">
          <input
            className="rounded border border-[var(--border)] px-3 py-2 text-[var(--text)] placeholder:text-[var(--text-soft)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-soft)]"
            placeholder="Name"
            {...register('name', { required: true })}
          />

          <input
            type="file"
            accept="image/*"
            className="rounded border border-[var(--border)] px-3 py-2 text-[var(--text-soft)]"
            {...register('photo')}
          />

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
            Register
          </button>
        </form>

        <button
          onClick={handleGoogle}
          className="mt-3 w-full rounded border border-[var(--border)] bg-[var(--bg)] px-4 py-2 font-medium text-[var(--text)] hover:bg-[var(--bg-soft)]"
        >
          Login with Google
        </button>

        <p className="mt-4 text-sm text-[var(--text-soft)]">
          Already have an account?{' '}
          <Link className="text-[var(--accent)] hover:underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Register
