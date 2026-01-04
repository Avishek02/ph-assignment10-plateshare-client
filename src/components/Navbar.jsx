import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { useState, useEffect, useRef } from 'react'
import './navbar.css'
import logo from "../assets/plateshare_logo.png"
import defaultAvatar from "../assets/default_avatar.jpg"

function Navbar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [hideNav, setHideNav] = useState(false)
  const [theme, setTheme] = useState('auto')
  const profileRef = useRef(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    if (saved) {
      setTheme(saved)
      if (saved !== 'auto') {
        document.documentElement.setAttribute('data-theme', saved)
      }
    }
  }, [])

  useEffect(() => {
    if (theme === 'auto') {
      document.documentElement.removeAttribute('data-theme')
      localStorage.removeItem('theme')
    } else {
      document.documentElement.setAttribute('data-theme', theme)
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    lastScrollY.current = window.scrollY
    const handleScroll = () => {
      const currentY = window.scrollY
      if (currentY > lastScrollY.current && currentY > 80) {
        setHideNav(true)
        setOpen(false)
        setProfileOpen(false)
      } else {
        setHideNav(false)
      }
      lastScrollY.current = currentY
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const profileImg = user?.photoURL ?? defaultAvatar

  const toggleTheme = () => {
    setTheme(prev =>
      prev === 'light' ? 'dark' : prev === 'dark' ? 'auto' : 'light'
    )
  }

  return (
    <nav className={`nav ${hideNav ? 'nav-hide' : ''}`}>
      <div className='nav-container'>
        <div className='flex items-center'>
          <img src={logo} alt="plateshare logo" className='w-10 h-10' />
          <Link to='/' className='nav-logo text-3xl text-brand-gradient font-extrabold'>
            PlateShare
          </Link>
        </div>

        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/foods'>Foods</Link>

          <button className='theme-toggle' onClick={toggleTheme}>
            {theme === 'dark' ? '🌙' : theme === 'light' ? '☀️' : '🖥️'}
          </button>

          {user ? (
            <div className='profile-dropdown' ref={profileRef}>
              <button
                type="button"
                className='profile-btn'
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <img
                  src={profileImg}
                  alt="User profile"
                  className='profile-img'
                  onError={(e) => {
                    e.currentTarget.src = defaultAvatar
                  }}
                />
              </button>

              <div className={`profile-menu ${profileOpen ? 'show' : ''}`}>
                <Link to='/add-food' onClick={() => setProfileOpen(false)}>Add Food</Link>
                <Link to='/manage-foods' onClick={() => setProfileOpen(false)}>My Foods</Link>
                <Link to='/my-requests' onClick={() => setProfileOpen(false)}>My Requests</Link>
                <Link to='/donor-requests' onClick={() => setProfileOpen(false)}>Donation Requests</Link>
                <button
                  className='logout-btn'
                  onClick={() => {
                    setProfileOpen(false)
                    logout()
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link className='login-btn rounded-full px-4 py-1 text-sm font-bold capitalize' to='/login'>
              Login
            </Link>
          )}
        </div>

        <button className='hamburger' onClick={() => setOpen(!open)}>☰</button>
      </div>
    </nav>
  )
}

export default Navbar
