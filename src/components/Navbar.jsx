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
  const profileRef = useRef(null)
  const lastScrollY = useRef(0)

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

  return (
    <nav className={`nav ${hideNav ? 'nav-hide' : ''}`}>
      <div className='nav-container '>
        <div className='flex items-center '>
          <img src={logo} alt="plateshare logo" className='w-10 h-10' />
          <Link to='/' className='nav-logo text-3xl text-brand-gradient font-extrabold'>
            PlateShare
          </Link>
        </div>

        <div className='nav-links'>
          <Link to='/'>Home</Link>
          <Link to='/foods'>Foods</Link>

          {user ? (
            <div className='profile-dropdown' ref={profileRef}>
              <button
                type="button"
                className='profile-btn'
                onClick={() => setProfileOpen(!profileOpen)}
                aria-label="User menu"
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

        <div className={`mobile-menu ${open ? 'show' : ''}`}>
          <Link to='/' onClick={() => setOpen(false)}>Home</Link>
          <Link to='/foods' onClick={() => setOpen(false)}>Foods</Link>

          {user ? (
            <>
              <Link to='/add-food' onClick={() => setOpen(false)}>Add Food</Link>
              <Link to='/manage-foods' onClick={() => setOpen(false)}>My Foods</Link>
              <Link to='/my-requests' onClick={() => setOpen(false)}>My Requests</Link>
              <Link to='/donor-requests' onClick={() => setOpen(false)}>Donation Requests</Link>
              <button
                className='logout-btn'
                onClick={() => {
                  setOpen(false)
                  logout()
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link to='/login' className='login-btn' onClick={() => setOpen(false)}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
